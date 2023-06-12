
import Recipe from '../models/Recipe.js';

export const Query = {
    async recipe(_, { ID }) {
        try {
            const recipe = await Recipe.findById(ID);
            return recipe;
        } catch (err) {
            throw new Error(err);
        }
    },

    async getAllRecipes(_, { amount }) {
        try {
            const recipes = await Recipe.find().sort({ createdAt: -1 }).limit(amount);
            return recipes;
        } catch (err) {
            throw new Error(err);
        }
    }
};
export const Mutation = {
    async createRecipe(_, { recipeInput: { name, description } }) {
        try {
            const newRecipe = new Recipe({
                name,
                description,
                createdAt: new Date().toISOString(),
                thumbsUp: 0,
                thumbsDown: 0,
            });
            const recipe = await newRecipe.save(); // save to database
            return recipe;
        } catch (err) {
            throw new Error(err);
        }
    },

    async deleteRecipe(_, { ID }) {
        try {
            const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount === 1;
            return wasDeleted; // true or false
        } catch (err) {
            s
            throw new Error(err);
        }
    },

    async editRecipe(_, { ID, recipeInput: { name, description } }) {
        try {
            const wasUpdated = (await Recipe.updateOne({ _id: ID }, { name, description })).modifiedCount === 1;
            return wasUpdated; // true or false
        } catch (err) {
            throw new Error(err);
        }
    }
};

export const resolvers = {
    Query,
    Mutation
};