import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./typedefs";
import connectDB from "./utils/db";

const initalizeServer = async (): Promise<ApolloServer> => {
  await connectDB();
  const server = new ApolloServer({
    resolvers,
    typeDefs
  });
  return server;
};

export default initalizeServer;
