declare module 'eventstore' {

  namespace es {
    export interface Payload {
      [key: string]: string | number | boolean | Payload;
    }

    export interface EventPayload {
      type: string;
      payload: Payload;
    }

    export interface Event {
      streamId: string;
      streamRevision: number;
      commitId: string;
      commitSequence: number;
      commitStamp: string;
      payload: EventPayload;
      id: string;
    }

    export interface Stream {
      events: Event[];
      addEvent(event: EventPayload): void;
      addEvents(events: EventPayload[]): void;
      commit(): void;
    }

    export interface Callback<T> {
      (err: Error, stream: T): void;
    }

    export interface EventStore {
      getEventStream(streamId: string, callback: Callback<Stream>): void;
      getLastEventAsStream(streamId: string, callback: Callback<Stream>): void;
      getNewId(callback: Callback<string>): void;
      init(callback?: Callback<void>): void;
      useEventPublisher(publisher: (event: EventPayload) => void): void;
      on(event: string, callback: Callback<void>): void;
    }
  }

  function es(config?: {}): es.EventStore;
  export = es;
}