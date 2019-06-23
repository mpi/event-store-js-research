import { QueryResolvers } from '@api';
import { TodoListAggregate } from '../../domain/todo-list';

type TodoListResolver = QueryResolvers['todoList'];

export const todoList: TodoListResolver = async (_, { id }, { eventStore }) => {

  const events = await eventStore.loadEvents(id);

  const todoList = new TodoListAggregate(events);

  return todoList.snapshot();
};
