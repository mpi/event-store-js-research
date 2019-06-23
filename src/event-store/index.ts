import * as eventStore from 'eventstore';
import { EventPayload } from 'eventstore';
import Projections from './projections';
import allTodoLists from '../projections/all-todo-lists';
import completedItems from '../projections/total-completed-items';

const es = eventStore({
  type: 'elasticsearch',
  host: 'localhost:9200',
  indexName: 'eventstore',
  eventsTypeName: 'events',
  snapshotsTypeName: 'snapshots',
  log: 'warning',
  maxSearchResults: 10000
  // maxSnapshotsCount: 3
});

es.on('connect', function() {
  console.log('storage connected');
});

es.on('disconnect', function() {
  console.log('connection to storage is gone');
});

const projections = new Projections(es);

es.useEventPublisher((event) => {
  projections.onEvent(event);
});

projections.registerProjection('all-todo-lists', allTodoLists);
projections.registerProjection('total-completed-items', completedItems);

es.init(() => {
  projections.init();
});


export const EventStore = {

  nextId() {
    return new Promise<string>((resolve, reject) => {
      es.getNewId((err, value) => {
        if(err) reject(reject);
        resolve(value);
      });
    });
  },

  loadEvents(aggregateId: string) {

    return new Promise<EventPayload[]>((resolve, reject) => {
      es.getEventStream(aggregateId, function(err, stream) {

        if(err) reject(err);

        const history = stream.events;
        resolve(history.map(e => e.payload));
      });

    });
  },

  publishEvents(aggregateId: string, events: EventPayload[]) {

    return new Promise((resolve, reject) => {
      es.getLastEventAsStream(aggregateId, function(err, stream) {

        if(err) reject(err);

        stream.addEvents(events);
        stream.commit();
        resolve();
      });

    });
  },

  getProjection(projectionId: string) {
    return projections.getState(projectionId);
  }

};

export type EventStore = typeof EventStore;