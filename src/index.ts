import "reflect-metadata";
import { GraphQLServer } from 'graphql-yoga'
import { createConnection } from "typeorm";
import { genSchema } from "./utils/genSchema";

createConnection().then(() => {
  const server = new GraphQLServer({
    schema: genSchema(),
  });

  server.start();
  if (!process.env.POST) {
    console.log('Server is running on localhost 4000');
  }
});
