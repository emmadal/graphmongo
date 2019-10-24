import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    users: [User!]!
    oneuser(name: String!): User!
  }

  type User {
    id: ID!
    name: String!
    age: Int!
    country: String!
  }

  input UserInput {
    name: String!
    age: Int!
    country: String!
  }

  type Mutation {
    createUser(input: UserInput!): User!
  }
`;
