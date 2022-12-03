import 'reflect-metadata';
import * as Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';

import { InvoiceResolver } from './resolvers/invoice';

const main = async () => {
  try {
    await connect('mongodb://0.0.0.0:27017/tornell-invoices');
    console.log('Connected to mongodb!');
  } catch (err) {
    console.log(`Error while connecting to mongodb: ${err}`);
  }

  const schema = await buildSchema({
    resolvers: [InvoiceResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000/graphql');
  });
};

main();
