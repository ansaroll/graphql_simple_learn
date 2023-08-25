import { gql } from "apollo-server";

export const forumTypeDefs = gql`
    type Post {
        id: ID
        title: String
        body: String
        createdAt: String
        updatedAt: String
        createdBy: String
        comments: [Comment]
    }

    type Comment {
        id: ID
        body: String
        createdAt: String
        updatedAt: String
        createdBy: String
        postId:ID
    }

    type Posts {
        posts: [Post]
        postLength: Int
    }

    input CommentInput {
        body:String
        createdBy:String
        postId:ID
    }

    input PostInput {
        title:String
        body:String
        createdBy:String
    }

    type Query {
        post(ID:ID): Post
        posts(ID:ID):Posts
        # comment
        comment(ID:ID!): Comment
        comments(ID:ID): [Comment]
        # all comments for a post
        getPostComments(ID:ID!): [Comment]
    }

    type Mutation {
        createPost(postInput: PostInput): Post
        editPost(ID:ID!, postInput: PostInput): Post
        deletePost(ID:ID!): Post
        createComment(commentInput: CommentInput): Comment
        # delete comments
        deletComment(ID:ID!): Comment
    }
`