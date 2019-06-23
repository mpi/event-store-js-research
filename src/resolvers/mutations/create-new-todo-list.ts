import { MutationResolvers, TodoList } from '@api';
import { TodoListAggregate } from '../../domain/todo-list';

type CreateNewTodoListResolver = MutationResolvers['createNewTodoList'];

export const createNewTodoList: CreateNewTodoListResolver = async (_, { name }, { eventStore }) => {

  const id = await eventStore.nextId();

  const events = TodoListAggregate.create(id, name);
  await eventStore.publishEvents(id, events);

  const todoList = new TodoListAggregate(events);
  return todoList.snapshot();
};
