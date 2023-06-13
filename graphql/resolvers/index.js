import { userResolvers } from './userResolver.js';
import { resolvers } from './resolvers.js';
import { messageResolvers } from './messageResolver.js';

const allResolvers = {
    Query: {
        ...userResolvers.Query,
        ...resolvers.Query,
        ...messageResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...resolvers.Mutation,
        ...messageResolvers.Mutation,
    }
}

export default allResolvers;