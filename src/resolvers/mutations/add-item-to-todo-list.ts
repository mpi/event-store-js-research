import { MutationResolvers } from '@api';
import { TodoListAggregate } from '../../domain/todo-list';

type AddItemToTodoListResolver = MutationResolvers['addItemToTodoList'];

export const addItemToTodoList: AddItemToTodoListResolver = async (_, { id, title }, { eventStore }) => {

  const events = await eventStore.loadEvents(id);

  const todoList = new TodoListAggregate(events);
  await eventStore.publishEvents(id, todoList.addItem(title));

  return todoList.snapshot();
};
