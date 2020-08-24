import "./env";
import logger from "morgan";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import passport from "passport";
import "./passport";
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({ request }) // context를 사용하여 resolver 사이에서 정보 공유 : 다른 resolver에서 import 안해도 됨
   }); 

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port : PORT }, () =>
    console.log(`Server running on http://localhost/${PORT}`)
);