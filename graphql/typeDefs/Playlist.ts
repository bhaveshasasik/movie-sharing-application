import gql from "graphql-tag";

type PlaylistId = string;

type PlaylistInput = {
  name : string
};

// noinspection GraphQLTypeRedefinition
// Linting cannot handle multiple GraphQl files
const typeDefs = gql`
  type Playlist {
    id: ID!
    name: String!
    user: User
    userId: ID
    movies: [Movie]
  }

  input PlaylistInput {
    name: String!
  }

  type Query {
    playlist(id: ID!): Playlist
    playlists: [Playlist]
  }

  type Mutation {
    createPlaylist(input: PlaylistInput!): Playlist
    addMovie(playlistId: ID!, movieId: ID!): Boolean
  }
`;

export default typeDefs;

export type {
  PlaylistId,
  PlaylistInput
};
