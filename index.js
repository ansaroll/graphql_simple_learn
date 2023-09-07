import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { typeDefs } from './graphql/typeDefs.js';
import allResolvers from './graphql/resolvers/index.js';
import { forumTypeDefs } from './graphql/typedefs/forumTypeDefs.js';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { cabMedTypeDefs } from './graphql/typedefs/cabMedTypeDefs.js';
import graphqlUploadKoa from "graphql-upload/graphqlUploadKoa.mjs";
import Express from 'express';

const MONGODB = "mongodb+srv://ansaroll:ansaroll@cluster0.ew8ropv.mongodb.net/?retryWrites=true&w=majority"

const allTypeDefs = mergeTypeDefs([typeDefs, forumTypeDefs, cabMedTypeDefs]);

const server = new ApolloServer({
    typeDefs: allTypeDefs,
    resolvers: allResolvers
});

const app = new Express();

app.use(graphqlUploadKoa({
    maxFileSize: 10000000,
    maxFiles: 10
}));


mongoose.connect(MONGODB).then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
})
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch((err) => {
        console.log(err);
    });