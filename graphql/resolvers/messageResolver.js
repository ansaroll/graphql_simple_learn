import Message from "../../models/Message.js";
import { ApolloError } from "apollo-server";

export const messageResolvers = {
    Query: {
        async message(_, { ID }) {
            try {
                const message = await Message.findById(ID);
                return message;
            }
            catch (err) {
                throw new ApolloError(err);
            }
        },
        async getAllMessages(_, { ID }) {
            try {
                const messages = await Message.find().sort({ createdAt: -1 }).limit(ID);
                return messages
            }
            catch (err) {
                throw new ApolloError(err);
            }
        },
    },

    Mutation: {
        async createMessage(_, { messageInput: { text, username } }) {
            try {
                const newMessage = new Message({
                    text,
                    username,
                    createdAt: new Date().toISOString(),
                });
                const message = await newMessage.save(); // save to database
                return message;
            } catch (err) {
                throw new Error(err);
            }
        },

        async deleteMessage(_, { ID }) {
            try {
                const wasDeleted = (await Message.deleteOne({ _id: ID })).deletedCount === 1;
                return wasDeleted; // true or false
            } catch (err) {
                throw new Error(err);
            }
        },
    }
}
