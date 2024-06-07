import gql from "graphql-tag";

export type UserInput = {
  id: UserId;
  name: string;
  password: string;
}

export type UserId = string;
export type UserPassword = string;

// noinspection GraphQLTypeRedefinition
// Linting cannot handle multiple GraphQl files
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    playlists: [Playlist]
  }
  
  input UserInput {
    id: ID!
    name: String!
    password: String!
  }

  type Query {
    user(id: ID!): User
    users(ids: [ID]!): [User]
  }

  type Mutation {
    createUser(input: UserInput!): User
    updateUser(input: UserInput!): User
    deleteUser: Boolean
  }
`;

export default typeDefs;