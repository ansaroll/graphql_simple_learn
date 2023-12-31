import { Post, Comment } from '../../models/Post.js';
import { GraphQLError as ApolloError } from 'graphql';

export const forumResolvers = {
    Query: {
        async post(_, { ID }) {
            try {
                const post = await Post.findById(ID).populate('comments').exec()
                return post;
            }
            catch (err) {
                throw new ApolloError(err);
            }
        },

        async posts(_, { ID }) {
            try {
                const posts = await Post.find().populate('comments');
                const postLength = posts.length;
                // return: posts, postLength , all comments for each post
                console.log('posts populated', posts);
                return { posts, postLength }
            }
            catch (err) {
                throw new ApolloError(err);
            }
        },

        async comment(_, { ID }) {
            try {
                const comment = await Comment.findById(ID);
                return comment;
            }
            catch (err) {
                throw new ApolloError(err);
            }
        },

        async comments(_, { ID }) {
            try {
                const comments = await Comment.find().sort({ createdAt: -1 }).limit(ID);
                return comments
            }
            catch (err) {
                throw new ApolloError(err);
            }
        },

        async getPostComments(_, { ID }) {
            try {
                const comments = await Comment.find({ postId: ID });
                return comments
            }
            catch (err) {
                throw new ApolloError(err);
            }
        }
    },

    Mutation: {
        async createPost(_, { postInput: { title, body, createdBy } }) {
            try {
                const newPost = new Post({
                    title,
                    body,
                    createdBy,
                    createdAt: new Date().toISOString(),
                });
                const post = await newPost.save(); // save to database
                return post;
            } catch (err) {
                throw new ApolloError(err);
            }
        },

        async editPost(_, { ID, postInput: { title, body, createdBy } }) {
            try {
                const post = await Post.findById(ID);
                post.title = title || post.title;
                post.body = body || post.body;
                post.createdBy = createdBy || post.createdBy;
                post.updatedAt = new Date().toISOString();
                await post.save();
                return post;
            } catch (err) {
                throw new ApolloError(err);
            }
        },

        async deletePost(_, { ID }) {
            try {
                const wasDeleted = (await Post.deleteOne({ _id: ID })).deletedCount === 1;
                return wasDeleted; // true or false
            } catch (error) {
                throw new ApolloError(error);
            }
        },

        async createComment(_, { commentInput: { body, createdBy, postId } }) {
            try {
                const newComment = new Comment({
                    body,
                    createdBy,
                    postId,
                    createdAt: new Date().toISOString(),
                });
                const comment = await newComment.save(); // save to database
                return comment;
            } catch (err) {
                throw new ApolloError(err);
            }
        },

        async deletComment(_, { ID }) {
            try {
                const wasDeleted = (await Comment.deleteOne({ _id: ID })).deletedCount === 1;
                return wasDeleted; // true or false
            } catch (error) {
                throw new ApolloError(error);
            }
        }
    }
}