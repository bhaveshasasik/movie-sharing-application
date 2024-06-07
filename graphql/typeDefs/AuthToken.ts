import gql from "graphql-tag";

// noinspection GraphQLTypeRedefinition
// Linting cannot handle multiple GraphQl files
const typeDefs = gql`
  type Mutation {
    login(userId: ID!, password: String!): Boolean
    logout: Boolean
    deleteAllAuthTokens: Boolean
    deleteAllExceptForCurrentlyLoggedIn: Boolean
  }
`;

export default typeDefs;