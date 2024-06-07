import Playlists from "../services/Playlist";
import Users from "../services/User";
import {UserId} from "@/graphql/typeDefs/User";
import {MovieId} from "@/graphql/typeDefs/Movie";
import {PlaylistId, PlaylistInput} from "@/graphql/typeDefs/Playlist";
import Context from "@/graphql/typeDefs/context";

const resolvers = {
  Playlist: {
    user: ({ userId }: { userId: UserId }) => Users.find({ id: userId }),
    movies: ({ id }: {id: MovieId}) => Playlists.getMovies({ id }),
  },
  Query: {
    playlist: (_: any, { id }: { id: PlaylistId }) => Playlists.find({ id }),
    playlists: () => Playlists.findAll(),
  },
  Mutation: {
    createPlaylist: (_: any, { input } : { input: PlaylistInput }, context: Context) => {
      if (context.err) { // Can only create playlist if the user is logged in
        throw context.err;
      }

      if (!context.user)
        throw "User is null";

      return Playlists.create({ userId: context.user.id, input })
    },
    addMovie: (_: any, { playlistId, movieId } : { playlistId: PlaylistId, movieId: MovieId }, context: Context) => {
      if (context.err) { // Can only add movie if the user is logged in
        throw context.err;
      }

      if (!context.user)
        throw "User is null";

      return Playlists.addMovie({userId: context.user.id, playlistId, movieId});
    },
  },
};
export default resolvers;
