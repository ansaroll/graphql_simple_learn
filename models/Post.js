import { model, Schema } from 'mongoose';

const postSchema = new Schema({
    title: String,
    body: String,
    createdAt: String,
    updatedAt: String,
    createdBy: String,
    comments: [{
        type: Schema.Types.ObjectId,
    }],
});

const commentSchema = new Schema({
    body: String,
    createdAt: String,
    updatedAt: String,
    createdBy: String,
    postId: {
        type: Schema.Types.ObjectId,
    },
});

export const Post = model('Post', postSchema);
export const Comment = model('Comment', commentSchema);