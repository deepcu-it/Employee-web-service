export const ApolloServerSchema = `#graphql
type Todo {
    id: ID!
    user: User
    text: String!
    completed: Boolean!
}
type Geo {
  lat: String
  lng: String
}

type Address {
  street: String
  suite: String
  city: String
  zipcode: String
  geo: Geo
}

type Company {
  name: String
  catchPhrase: String
  bs: String
}

type User {
  id: ID!
  name: String!
  username: String!
  email: String!
  address: Address!
  phone: String!
  website: String!
  company: Company!
}

type Query {
    getTodos: [Todo]
    getAllUsers: [User]
    getUserById(id: ID!): User
}
`;