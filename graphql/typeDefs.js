import { gql } from 'apollo-server';


export const typeDefs = gql`
# type
    type Recipe {
        name: String
        description: String
        createdAt: String
        thumbsUp: Int
        thumbsDown: Int
    }

    type Message {
        text: String
        createdAt: String
        createdBy: String
    }

    type User {
        username: String
        email: String
        token: String
    }

# input type
    input RecipeInput {
        name: String!
        description: String
    }

    input MessageInput {
        text: String
        username: String
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

# query

    type Query {
        recipe(ID: ID): Recipe!
        getAllRecipes(amount:Int): [Recipe]
        # message
        message(ID: ID): Message
        getAllMessages(ID: ID): [Message]
        # user
        user(ID: ID): User
        getAllUsers(ID: ID): [User]
    }
    

# mutation

    type Mutation {
        createRecipe(recipeInput: RecipeInput): Recipe!
        deleteRecipe(ID: ID!): Boolean
        editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean
        # message
        createMessage(messageInput: MessageInput): Message!
        deleteMessage(ID: ID!): Boolean
        # user
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput:LoginInput) : User
    }

`