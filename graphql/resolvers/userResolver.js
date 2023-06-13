import User from "../../models/User.js";
import { ApolloError } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import omit from "lodash";

export const userResolvers = {
    Query: {
        async user(_, { ID }) {
            try {
                const user = await User.findById(ID);
                return user;
            }
            catch (err) {
                throw new ApolloError(err);
            }
        },
        async getAllUsers(_, { ID }) {
            try {
                const users = await User.find().sort({ createdAt: -1 }).limit(ID);
                return omit(users, ['password']);
            }
            catch (err) {
                throw new ApolloError(err);
            }
        },
    },

    Mutation: {
        async registerUser(_, { registerInput: { username, email, password } }) {
            try {
                const olduser = await User.findOne({ email });

                // check if user exists
                if (olduser) {
                    throw new ApolloError("User already exists : " + email, 'USER_ALREADY_EXISTS');
                }

                // encrypt password
                if (password.length < 6) {
                    throw new ApolloError("Password must be at least 6 characters", 'PASSWORD_TOO_SHORT');
                }
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
                throw new ApolloError(err);
            }
        },

        async loginUser(_, { loginInput: { email, password } }) {
            try {
                const user = await User.findOne({ email });

                // check if user exists
                if (!user) {
                    throw new ApolloError("User not found" + email, 'USER_NOT_FOUND');
                }

                // check if password is correct
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    throw new ApolloError("Wrong credentials" + email, 'WRONG_CREDENTIALS');
                }

                // create token & atach to user
                const token = jwt.sign({
                    email: user.email,
                    id: user._id
                },
                    "secret_file_string_1234",
                    { expiresIn: '2h' }
                )

                user.token = token;

                return {
                    id: user.id,
                    ...user._doc,
                }
            } catch (err) {
                throw new ApolloError(err);
            }
        }

    }
}
