import { userResolvers } from './userResolver.js';
import { resolvers } from './resolvers.js';
import { messageResolvers } from './messageResolver.js';
import { forumResolvers } from './forumResolver.js';
import { cabMedResolvers } from './cabMedResolver.js';

const allResolvers = {
    Query: {
        ...userResolvers.Query,
        ...resolvers.Query,
        ...messageResolvers.Query,
        ...forumResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...resolvers.Mutation,
        ...messageResolvers.Mutation,
        ...forumResolvers.Mutation,
    }
}

export default allResolvers;