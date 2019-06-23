import { MutationResolvers } from '@api';
import { TodoListAggregate } from '../../domain/todo-list';

type CompleteItemInTodoListResolver = MutationResolvers['completeItemInTodoList'];

export const completeItemInTodoList: CompleteItemInTodoListResolver = async (_, { id, title }, { eventStore }) => {

  const events = await eventStore.loadEvents(id);

  const todoList = new TodoListAggregate(events);
  await eventStore.publishEvents(id, todoList.completeItem(title));

  return todoList.snapshot();
};
