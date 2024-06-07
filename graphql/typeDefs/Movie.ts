import gql from "graphql-tag";

type MovieId = string;

type MovieInput = {
  name: string
};

// noinspection GraphQLTypeRedefinition
// Linting cannot handle multiple GraphQl files
const typeDefs = gql`
  type Movie {
    id: ID!
    name: String!
    description: String
    playlists: [Playlist]
  }

  input MovieInput {
    name: String!
    description: String
  }

  type Query {
    movie(id: ID!): Movie
    movies(name: String, description: String): [Movie]
  }

  type Mutation {
    createMovie(input: MovieInput!): Movie
  }
`;

export default typeDefs;

export type {
  MovieId,
  MovieInput
};
