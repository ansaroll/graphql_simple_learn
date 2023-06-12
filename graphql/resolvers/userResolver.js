import User from "../../models/User.js";
import { ApolloError } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Query = {
    async user(_, { ID }) {
        try {
            const user = await User.findById(ID);
            return user;
        }
        catch (err) {
            throw new Error(err);
        }
    },
    
    async registerUser(_, { registerInput: { username, email, password } }) {
        try {
            const olduser = await User.findOne({ email });

            // check if user exists
            if (olduser) {
                throw new ApolloError("User already exists" + email, 'USER_ALREADY_EXISTS');
            }

            // encrypt password
            var encryptedPassword = await bcrypt.hash(password, 12);

            // create new user
            const newUser = new User({
                username,
                email: email.toLowerCase(),
                password: encryptedPassword,
            });

            // create token & atach to user
            const token = jwt.sign({
                email: newUser.email,
                id: newUser._id
            },
                "secret_file_string_1234",
                { expiresIn: '2h' }
            )

            newUser.token = token;
            // save user
            const user = await newUser.save();

            return {
                id: user.id,
                ...user._doc,
            }


        }
        catch (err) {
            throw new Error(err);
        }
    },
}

export const Mutation = {
    async register(_, { registerInput: { username, email, password } }) {
        try {
            const newUser = new User({
                username,
                email,
                password,
                token: "1234"
            });
            const user = await newUser.save();
            return user;
        }
        catch (err) {
            throw new Error(err);
        }
    }
}

export const userResolvers = {
    Query,
    Mutation
}