import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers";
import { createConnection } from "typeorm";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  const apolloServer = new ApolloServer({
    schema,
  });
  const app = Express();
  apolloServer.applyMiddleware({
    app,
  });
  app.listen(4000, () => {
    console.log("app run on http://localhost:4000/graphql");
  });
};

main();