import "reflect-metadata";
import { GraphQLServer } from 'graphql-yoga'
import { createConnection } from "typeorm";
import { genSchema } from "./utils/genSchema";

const server = new GraphQLServer({
  schema: genSchema(),
});

createConnection().then(() => {
  server.start().then(() => console.log('Server is running on localhost:4000'));
});
