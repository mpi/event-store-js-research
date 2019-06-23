import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import { Context } from './context';
import { EventStore } from './event-store';

const typeDefs = require('../schema/schema.graphql').default;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const rootValue = {};
const context: Context = {
  eventStore: EventStore
};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    context,
    schema,
    rootValue,
    graphiql: true
  })
);
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
