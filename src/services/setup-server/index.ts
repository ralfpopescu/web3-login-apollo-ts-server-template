const {ApolloServer, gql} = require("apollo-server-express");
const path = require("path");
const {v4: uuidv4} = require("uuid");

const {concatFiles} = require("../fs");
const resolvers = require("../../resolvers");
const logger = require("../logger");
const {QueryLogger} = require("../query-logger");
const processAuth = require("./process-auth");

const Model = require("../../db");
const {getMongoose} = require("../../db/get-mongoose");

const typeDefs = gql`
  ${concatFiles(path.resolve(__dirname, "../../schema"))}
`;

export const setupServer = async () => {
  const mongoose = await getMongoose();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    extensions: [() => new QueryLogger(logger)],
    playground: {
      shareEnabled: true,
    },
    context: async ({req}: {req: Request}) => {
      const auth = req.headers.get("Authorization") || null;
      const authenticatedUser = await processAuth(auth);
      const requestId = uuidv4();

      return {mongoose, Model, authenticatedUser, requestId};
    },
  });

  return server;
};
