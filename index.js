import mongoose from 'mongoose';
import { forumTypeDefs } from './graphql/typedefs/forumTypeDefs.js';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { cabMedTypeDefs } from './graphql/typedefs/cabMedTypeDefs.js';
import graphqlUploadKoa from "graphql-upload/graphqlUploadKoa.mjs";
// import Express from 'express';

const MONGODB = "mongodb+srv://ansaroll:ansaroll@cluster0.ew8ropv.mongodb.net/?retryWrites=true&w=majority"

import { fileURLToPath } from "node:url";

// Ensure the upload directory exists.

// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { typeDefs } from './graphql/typeDefs.js';
import allResolvers from './graphql/resolvers/index.js';
import makeDir from 'make-dir';
import UPLOAD_DIRECTORY_URL from "./config/UPLOAD_DIRECTORY_URL.js";

await makeDir(fileURLToPath(UPLOAD_DIRECTORY_URL));

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.

const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const allTypeDefs = mergeTypeDefs([typeDefs, forumTypeDefs, cabMedTypeDefs]);
const server = new ApolloServer({
    csrfPrevention: false,
    typeDefs: allTypeDefs,
    resolvers: allResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    '/',
    cors(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }),
);

app.use(graphqlUploadKoa({
    maxFileSize: 10000000,
    maxFiles: 10
}))

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 5000 }, resolve));

mongoose.connect(MONGODB).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log(err);
})
console.log(`🚀 Server ready at http://localhost:5000/`);