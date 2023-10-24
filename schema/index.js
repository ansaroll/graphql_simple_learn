// @ts-check

import { GraphQLSchema } from "graphql";

import MutationType from "./MutationType.js";
import QueryType from "./QueryType.js";

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});