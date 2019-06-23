import { QueryResolvers } from '@api';
import { allTodoLists } from './all-todo-lists';
import { todoList } from './todo-list';

const queries: QueryResolvers = {
  allTodoLists,
  todoList
};

export default queries;
