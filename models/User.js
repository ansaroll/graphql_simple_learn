import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    lastName: { type: String },
    firstName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    token: { type: String },
    createdAt: { type: String, default: new Date().toISOString() },
    updatedAt: { type: String, default: new Date().toISOString() }
});

export default model('User', userSchema);