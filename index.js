import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { typeDefs } from './graphql/typeDefs.js';
import allResolvers from './graphql/resolvers/index.js';
import { forumTypeDefs } from './graphql/typedefs/forumTypeDefs.js';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { cabMedTypeDefs } from './graphql/typedefs/cabMedTypeDefs.js';

const MONGODB = "mongodb+srv://ansaroll:ansaroll@cluster0.ew8ropv.mongodb.net/?retryWrites=true&w=majority"

const allTypeDefs = mergeTypeDefs([typeDefs, forumTypeDefs , cabMedTypeDefs]);

const server = new ApolloServer({
    typeDefs: allTypeDefs,
    resolvers: allResolvers
});


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