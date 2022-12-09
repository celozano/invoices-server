require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL!;
const PORT = process.env.PORT || 8080;

import 'reflect-metadata';
import * as Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';

import { authChecker } from './auth/authChecker';
import { decodeIDToken } from './firebase';
import { InvoiceResolver } from './resolvers/invoice';

const main = async () => {
  try {
    await connect(DATABASE_URL);
    console.log('Connected to mongodb.');
  } catch (err) {
    console.log(`Error while connecting to mongodb: ${err}`);
  }

  const schema = await buildSchema({
    resolvers: [InvoiceResolver],
    authChecker,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: async (req) => {
      const user = await decodeIDToken(req);

      return { ...req, user };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log('Server running');
  });
};

main();
