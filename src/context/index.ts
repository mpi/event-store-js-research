import { TodoList } from '@api';
import { EventStore } from '../event-store';

export type Context = {
  eventStore: EventStore;
};