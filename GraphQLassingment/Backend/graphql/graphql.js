import { ApolloServer } from "@apollo/server";
import { getAllBooks, getBookById } from "../resolvers/bookResolvers.js";
import { getAllUsers, getUserById } from "../resolvers/userResolvers.js";

const server = new ApolloServer({
    typeDefs: `
    type Book {
      id: ID!
      title: String!
      author: String!
      publishedYear: Int
    }
    type User {
      id: ID!
      name: String!
      email: String!
      phone: String
    }
    type Query {
      getAllBooks: [Book]
      getBookById(id: ID!): Book
      getAllUsers: [User]
      getUserById(id: ID!): User
    }
  `,
    resolvers: {
        Query: {
            getAllBooks: () => getAllBooks(),
            getBookById: (_, { id }) => getBookById(id),
            getAllUsers: () => getAllUsers(),
            getUserById: (_, { id }) => getUserById(id),
        },
    }
});

export default server;
