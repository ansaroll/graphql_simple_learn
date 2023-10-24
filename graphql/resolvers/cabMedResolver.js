import { CabMed } from "../../models/CabMed.js";
import { GraphQLError as ApolloError } from 'graphql';

export const cabMedResolvers = {
    Query: {
        async cabmed(_, { ID }) {
            try {
                const cabmed = await CabMed.findById(ID);
                return cabmed;
            }
            catch (err) {
                throw new ApolloError(err);
            }
        },

        async cabmeds(_, { ID }) {
            try {
                const cabmeds = await CabMed.find().sort({ createdAt: -1 }).limit(ID);
                const cabmedLength = cabmeds.length;
                return { cabmeds, cabmedLength }
            }
            catch (err) {
                throw new ApolloError(err);
            }
        },
    },

    Mutation: {
        async createCabMed(_, { cabmedInput: { nom_cabinet, adresse, telephone, email, domaines, description, experience, langues, cv, createdBy } }) {
            try {
                const cabmed = new CabMed({
                    nom_cabinet,
                    adresse,
                    telephone,
                    email,
                    domaines,
                    description,
                    experience,
                    langues,
                    cv,
                    createdBy,
                    createdAt: new Date().toISOString()
                });
                await cabmed.save();
                return cabmed;
            }
            catch (err) {
                throw new ApolloError(err);
            }
        },

        async editCabMed(_, { ID, cabmedInput: { nom_cabinet, adresse, telephone, email, domaines, description, experience, langues, cv, createdBy } }) {
            try {
                const cabmed = await CabMed.findByIdAndUpdate(ID, {
                    nom_cabinet,
                    adresse,
                    telephone,
                    email,
                    domaines,
                    description,
                    experience,
                    langues,
                    cv,
                    createdBy
                });
                return cabmed;
            }
            catch (err) {
                throw new ApolloError(err);
            }
        },

        async deleteCabMed(_, { ID }) {
            try {
                const cabmed = await CabMed.findByIdAndDelete(ID);
                return cabmed;
            }
            catch (err) {
                throw new ApolloError(err);
            }
        },
    }

}