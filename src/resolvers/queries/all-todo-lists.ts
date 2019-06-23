import { QueryResolvers, TodoList } from '@api';

type AllTodoListsResolver = QueryResolvers['allTodoLists'];

export const allTodoLists: AllTodoListsResolver = (_, args, { eventStore }) => {
  const projection = eventStore.getProjection('all-todo-lists') as any;
  return projection.allTodoLists || []  as TodoList[];
};
