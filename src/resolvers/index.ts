import { Resolvers } from '@api';
import queries from './queries';
import mutations from './mutations';

const resolvers: Resolvers = {
  Query: queries,
  Mutation: mutations
};

export default resolvers;
