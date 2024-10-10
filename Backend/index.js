import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { connectDB } from "./db/connectDB.js";
import mergeResolvers from "./resolvers/index.js";
import mergeTypeDef from "./typeDefs/index.js";

//middleware
dotenv.config({ path: '../.env' });
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs: mergeTypeDef,
  resolvers: mergeResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
await connectDB();
app.use(
  "/",
  cors(),
  express.json(),

  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  })
);

await new Promise((resolve) => {
  return httpServer.listen({ port: 4000 }, resolve);
});
console.log("🚀 ~ connected");
