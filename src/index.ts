import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";

import {
  EmailConfirmation,
  LoginResolver,
  MeResolver,
  RegisterResolver,
} from "./resolvers";
import { redis } from "./redis";
import { SESSION_SECRET } from "./constants";

dotenv.config();

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, EmailConfirmation, MeResolver],
    /*
      authChecker for checking @Authentice()
      authChecker,
    */
  });
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });

  const RedisStore = require("connect-redis")(session);

  const app = Express();

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: "uid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 1 * 365, // 7 years
      },
    })
  );

  apolloServer.applyMiddleware({
    app,
  });
  app.listen(4000, () => {
    console.log("app run on http://localhost:4000/graphql");
  });
};

main();
