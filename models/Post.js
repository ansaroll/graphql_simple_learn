import { model, Schema } from 'mongoose';

const postSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    body: String,
    createdAt: String,
    updatedAt: String,
    createdBy: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    postLength: {
        type: Number
    },
});

const commentSchema = new Schema({
    _id: Schema.Types.ObjectId,
    body: String,
    createdAt: String,
    updatedAt: String,
    createdBy: String,
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
});

export const Post = model('Post', postSchema);
export const Comment = model('Comment', commentSchema);