import { model , Schema } from "mongoose";

const CabMedSchema = new Schema({
    nom_cabinet: String,
    adresse: String,
    telephone: String,
    email: String,
    domaines: String,
    description: String,
    experience: String,
    langues: String,
    cv: String,
    createdAt: String,
    createdBy: String
});  

export const CabMed =  model('CabMed', CabMedSchema);

// type in Frontend

// type TCabMedForm = {
//     nom_cabinet: string;
//     adresse: string;
//     telephone: string;
//     email: string;
//     domaines: string;
//     description: string;
//     experience: string;
//     langues: string;
//     cv: File | null;
// }