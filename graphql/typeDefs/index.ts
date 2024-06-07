import User from "./User";
import Playlist from "./Playlist";
import Movie from "./Movie";
import AuthToken from "@/graphql/typeDefs/AuthToken";

const typeDefs = [User, Playlist, Movie, AuthToken];

export default typeDefs;