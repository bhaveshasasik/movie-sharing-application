import User from "./User";
import Playlist from "./Playlist";
import Song from "./Movie";
import AuthToken from "@/graphql/resolvers/AuthToken";

const resolvers = [User, Playlist, Song, AuthToken];

export default resolvers;