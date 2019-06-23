import { MutationResolvers } from '@api';
import { createNewTodoList } from './create-new-todo-list';
import { addItemToTodoList } from './add-item-to-todo-list';
import { renameItemInTodoList } from './rename-item-in-todo-list';
import { completeItemInTodoList } from './complete-item-in-todo-list';

const mutations: MutationResolvers = {
  createNewTodoList,
  addItemToTodoList,
  renameItemInTodoList,
  completeItemInTodoList,
};

export default mutations;
