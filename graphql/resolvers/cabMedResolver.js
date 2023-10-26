import { CabMed } from "../../models/CabMed.js";
import { GraphQLError as ApolloError } from 'graphql';
import UPLOAD_DIRECTORY_URL from "../../config/UPLOAD_DIRECTORY_URL.js";
import { createWriteStream, unlink } from 'fs';
import path from 'path';
import { UPLOAD_DIR } from '../../index.js'
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

                // save cv to uploads folder and get the name and path of the file to save it in the database

                const { file } = cv

                const { createReadStream, filename } = await file
                const stream = createReadStream()

                const id = Date.now();
                const uploadPath = `${UPLOAD_DIR}/${id}-${filename}`;
                const fileNameOndatabase = `${id}-${filename}`;

                await new Promise((resolve, reject) => {
                    const writeStream = createWriteStream(uploadPath);
                    writeStream.on('finish', resolve);
                    writeStream.on('error', (error) => {
                        unlink(uploadPath, () => {
                            reject(error);
                        });
                    });
                    stream.on('error', (error) => writeStream.destroy(error));
                    stream.pipe(writeStream);
                });

                // console.log('pathName cv stream', filename, cv);

                const cabmed = new CabMed({
                    nom_cabinet,
                    adresse,
                    telephone,
                    email,
                    domaines,
                    description,
                    experience,
                    langues,
                    cv: fileNameOndatabase,
                    createdBy,
                    createdAt: new Date().toISOString()
                });

                // console.log('cabmed', cabmed, cv);

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