import { GraphQLResolveInfo } from "graphql";
import { Context } from "../src/context";
export type Maybe<T> = T | null;
export type MaybePromise<T> = Promise<T> | T;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: "Mutation";
  createNewTodoList?: Maybe<TodoList>;
  addItemToTodoList?: Maybe<TodoList>;
  renameItemInTodoList?: Maybe<TodoList>;
  completeItemInTodoList?: Maybe<TodoList>;
};

export type MutationCreateNewTodoListArgs = {
  name: Scalars["String"];
};

export type MutationAddItemToTodoListArgs = {
  id: Scalars["ID"];
  title: Scalars["String"];
};

export type MutationRenameItemInTodoListArgs = {
  id: Scalars["ID"];
  oldTitle: Scalars["String"];
  newTitle: Scalars["String"];
};

export type MutationCompleteItemInTodoListArgs = {
  id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  allTodoLists?: Maybe<Array<Maybe<TodoList>>>;
  todoList?: Maybe<TodoList>;
};

export type QueryTodoListArgs = {
  id: Scalars["ID"];
};

export type TodoList = {
  __typename?: "TodoList";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  items?: Maybe<Array<Maybe<TodoListItem>>>;
};

export type TodoListItem = {
  __typename?: "TodoListItem";
  title?: Maybe<Scalars["String"]>;
  completed?: Maybe<Scalars["Boolean"]>;
};

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: MaybePromise<{}>;
  TodoList: MaybePromise<TodoList>;
  ID: MaybePromise<Scalars["ID"]>;
  String: MaybePromise<Scalars["String"]>;
  TodoListItem: MaybePromise<TodoListItem>;
  Boolean: MaybePromise<Scalars["Boolean"]>;
  Mutation: MaybePromise<{}>;
};

export type MutationResolvers<
  ContextType = Context,
  ParentType = ResolversTypes["Mutation"]
> = {
  createNewTodoList?: Resolver<
    Maybe<ResolversTypes["TodoList"]>,
    ParentType,
    ContextType,
    MutationCreateNewTodoListArgs
  >;
  addItemToTodoList?: Resolver<
    Maybe<ResolversTypes["TodoList"]>,
    ParentType,
    ContextType,
    MutationAddItemToTodoListArgs
  >;
  renameItemInTodoList?: Resolver<
    Maybe<ResolversTypes["TodoList"]>,
    ParentType,
    ContextType,
    MutationRenameItemInTodoListArgs
  >;
  completeItemInTodoList?: Resolver<
    Maybe<ResolversTypes["TodoList"]>,
    ParentType,
    ContextType,
    MutationCompleteItemInTodoListArgs
  >;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType = ResolversTypes["Query"]
> = {
  allTodoLists?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TodoList"]>>>,
    ParentType,
    ContextType
  >;
  todoList?: Resolver<
    Maybe<ResolversTypes["TodoList"]>,
    ParentType,
    ContextType,
    QueryTodoListArgs
  >;
};

export type TodoListResolvers<
  ContextType = Context,
  ParentType = ResolversTypes["TodoList"]
> = {
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TodoListItem"]>>>,
    ParentType,
    ContextType
  >;
};

export type TodoListItemResolvers<
  ContextType = Context,
  ParentType = ResolversTypes["TodoListItem"]
> = {
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  completed?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = Context> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TodoList?: TodoListResolvers<ContextType>;
  TodoListItem?: TodoListItemResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
