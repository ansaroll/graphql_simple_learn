// @ts-check

import { readdir } from "node:fs/promises";

import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";

import UPLOAD_DIRECTORY_URL from "../config/UPLOAD_DIRECTORY_URL.js";
import FileType from "./FileType.js";

export default new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    uploads: {
      description: "All stored files.",
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FileType))),
      resolve: () => readdir(UPLOAD_DIRECTORY_URL),
    },
  }),
});