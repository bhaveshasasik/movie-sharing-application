import Movies from "../services/Movie";
import {MovieId, MovieInput} from "@/graphql/typeDefs/Movie";
import {Optional} from "@/graphql/typeDefs/utility";

const resolvers = {
  Movie: {
    playlists: () => null,
  },
  Query: {
    movie: (_: any, { id }: { id: MovieId }) => Movies.find({ id }),
    movies: (_: any, { name, description }: { name: Optional<string>, description: Optional<string> }) => Movies.findAll({ name, description }),
  },
  Mutation: {
    createMovie: (_: any, { input }: { input: MovieInput }) => Movies.create({ input }),
  },
};
export default resolvers;