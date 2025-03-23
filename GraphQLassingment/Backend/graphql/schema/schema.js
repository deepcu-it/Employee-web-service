// graphql/typeDefs.js
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    publishedDate: String!
    isbn: String!
    availableCopies: Int!
  }

  type Query {
    getBooks: [Book]
    getBook(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!, publishedDate: String!, isbn: String!, availableCopies: Int!): Book
    updateBook(id: ID!, title: String, author: String, publishedDate: String, isbn: String, availableCopies: Int): Book
    deleteBook(id: ID!): Book
  }
`;