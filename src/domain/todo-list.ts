import { Event } from './event';

interface TodoItemSnapshot {
  title: string;
  completed: boolean;
}

interface TodoListSnapshot {
  id: string;
  name: string;
  items: TodoItemSnapshot[];
}

export class TodoListAggregate {

  constructor(private events: Event[]) {}

  static create(id: string, name: string) {
    return [ new TodoListCreatedEvent(id, name) ];
  }

  addItem(title: string) {
    return [ new TodoItemAddedEvent(title) ];
  }

  completeItem(title: string) {
    return [ new TodoItemCompletedEvent(title) ];
  }

  renameItem(oldTitle: string, newTitle: string) {
    return [ new TodoItemRenamedEvent(oldTitle, newTitle) ];
  }

  onTodoListCreatedEvent(snapshot: TodoListSnapshot, { id, name }: TodoListCreatedEvent['payload']): TodoListSnapshot {
    return { id, name, items: [] };
  }

  onTodoItemAddedEvent({ items, ...rest }: TodoListSnapshot, { title }: TodoItemAddedEvent['payload']): TodoListSnapshot {
    return { ...rest, items: [...items, { title, completed: false }] };
  }

  onTodoItemCompletedEvent({ items, ...rest }: TodoListSnapshot, { title }: TodoItemCompletedEvent['payload']): TodoListSnapshot {
    return { ...rest, items: items.map(i => i.title !== title ? i : { title: i.title, completed: true }) };
  }

  onTodoItemRenamedEvent({ items, ...rest }: TodoListSnapshot, { oldTitle, newTitle }: TodoItemRenamedEvent['payload']): TodoListSnapshot {
    return { ...rest, items: items.map(i => i.title !== oldTitle ? i : { title: newTitle, completed: i.completed }) };
  }

  snapshot() {

    return this.events.reduce((snapshot, event) => {

      const reducer = `on${event.type}`;

      const handler = (this as any)[reducer];

      if(typeof handler  === 'function') {
        return handler(snapshot, event.payload);
      } else {
        return snapshot;
      }

    }, {});

  }

}

export class TodoListCreatedEvent {

  public readonly type = 'TodoListCreatedEvent';
  public payload: { id: string, name: string; };

  constructor(id: string, name: string) {
    this.payload = { id, name };
  }
}

export class TodoItemAddedEvent {

  public readonly type = 'TodoItemAddedEvent';
  public payload: { title: string; };

  constructor(title: string) {
    this.payload = { title };
  }
}

export class TodoItemRenamedEvent {

  public readonly type = 'TodoItemRenamedEvent';
  public payload: { oldTitle: string; newTitle: string; };

  constructor(oldTitle: string, newTitle: string) {
    this.payload = { oldTitle, newTitle };
  }
}

export class TodoItemCompletedEvent {

  public readonly type = 'TodoItemCompletedEvent';
  public payload: { title: string; };

  constructor(title: string) {
    this.payload = { title };
  }
}