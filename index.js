import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { typeDefs } from './graphql/typeDefs.js';
import allResolvers from './graphql/resolvers/index.js';

const MONGODB = "mongodb+srv://ansaroll:ansaroll@cluster0.ew8ropv.mongodb.net/?retryWrites=true&w=majority"

const server = new ApolloServer({
    typeDefs,
    resolvers: allResolvers
});


mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
})
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch((err) => {
        console.log(err);
    });