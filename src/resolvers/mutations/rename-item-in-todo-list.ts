import { MutationResolvers } from '@api';
import { matches } from 'lodash';
import { TodoListAggregate } from '../../domain/todo-list';

type RenameItemInTodoListResolver = MutationResolvers['renameItemInTodoList'];

export const renameItemInTodoList: RenameItemInTodoListResolver = async (_, { id, oldTitle, newTitle }, { eventStore }) => {

  const events = await eventStore.loadEvents(id);

  const todoList = new TodoListAggregate(events);
  await eventStore.publishEvents(id, todoList.renameItem(oldTitle, newTitle));

  return todoList.snapshot();
};
