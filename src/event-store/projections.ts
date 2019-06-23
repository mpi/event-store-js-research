import { EventStore, Stream } from 'eventstore';

export interface Projection<S = {}> {
  $init?(): S;
  [handler: string]: (state: S, event: {}) => S;
}

export default class Projections {
  private projections: { [projectionId: string]: Projection };
  private state: { [projectionId: string]: {} };
  private streams: { [projectionId: string]: Stream };

  constructor(private eventStore: EventStore) {
    this.projections = {};
    this.state = {};
    this.streams = {};
  }

  registerProjection(projectionId: string, projection: Projection) {
    this.projections[projectionId] = projection;
  }

  init() {
    for (const projectionId in this.projections) {
      if (this.projections.hasOwnProperty(projectionId)) {
        this.eventStore.getLastEventAsStream(`projection-${projectionId}`, (err, stream) => {
          if (err) {
            console.debug('could not load stream!');
          }

          const lastEvent = stream.events[0];
          this.state[projectionId] = lastEvent ? lastEvent.payload : init(this.projections[projectionId]);
          this.streams[projectionId] = stream;
          // TODO: should replay all events since lastEvent
        });
      }
    }
  }

  onEvent(event: { type: string; payload: any }) {
    for (const projectionId in this.projections) {
      if (this.projections.hasOwnProperty(projectionId)) {
        const projection = this.projections[projectionId];

        const handler = (projection as any)[`on${event.type}`];
        if (typeof handler === 'function') {
          const state = this.state[projectionId] || init(projection);
          const newState = handler(state, event.payload);
          this.state[projectionId] = newState;

          const projectionStream = this.streams[projectionId];
          if(projectionStream) {
            console.log('stream', projectionId, projectionStream, this.streams);
            projectionStream.addEvent(newState);
            projectionStream.commit();
          }
        }
      }
    }
  }

  getState(projectionId: string) {
    return this.state[projectionId];
  }
}

function init(projection: any) {
  if (typeof projection['$init'] === 'function') {
    return projection.$init() || {};
  }
  return {};
}
