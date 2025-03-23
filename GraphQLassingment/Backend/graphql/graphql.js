
import { ApolloServer } from "@apollo/server";
import axios from "axios";
import { ApolloServerSchema } from "./schema/schema.js";
import { resolvers } from "./resolvers/resolvers.js";

export const connectGraphQL = () => {
    const server = new ApolloServer({
        typeDefs: ApolloServerSchema,
        resolvers: resolvers,
    });

    return server;
};

