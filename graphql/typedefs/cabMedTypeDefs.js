import { gql } from "apollo-server";

export const cabMedTypeDefs = gql`

    type CabMed {
        id: ID
        nom_cabinet: String
        adresse: String
        telephone: String
        email: String
        domaines: String
        description: String
        experience: String
        langues: String
        cv: String
        createdAt: String
        createdBy: String
    }

    input CabMedInput {
        nom_cabinet: String
        adresse: String
        telephone: String
        email: String
        domaines: String
        description: String
        experience: String
        langues: String
        cv: String
        createdAt: String
        createdBy: String
    }

    type CabMeds {
        cabmeds: [CabMed]
        cabmedLength: Int
    }

    type Query {
        cabmed(ID:ID): CabMed
        cabmeds(ID:ID):CabMeds
    }

    type Mutation {
        createCabMed(cabmedInput: CabMedInput): CabMed
        editCabMed(ID:ID!, cabmedInput: CabMedInput): CabMed
        deleteCabMed(ID:ID!): CabMed
    }
`