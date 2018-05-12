import "reflect-metadata";
import { GraphQLServer } from 'graphql-yoga'
import { createConnection } from "typeorm";
import { genSchema } from "./utils/genSchema";

const server = new GraphQLServer({
  schema: genSchema(),
});

createConnection().then(() => {
  server.start({
    port:   process.env.PORT || 4000
  }).then(() => console.log('Server is running on localhost:4000'));
});
