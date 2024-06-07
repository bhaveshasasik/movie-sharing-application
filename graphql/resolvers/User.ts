import Users from "../services/User";
import {UserId, UserInput} from "@/graphql/typeDefs/User";
import Context from "@/graphql/typeDefs/context";

const resolvers = {
  User: {
    playlists: ({ id }: { id: UserId }) => Users.getPlaylists({ id }),
  },
  Query: {
    user: (_: any, { id }: { id: UserId }) => Users.find({ id }),
    users: (_: any, { ids }: { ids: UserId[] }) => Users.findMany({ ids }),
  },
  Mutation: {
    createUser: (_: any, { input }: { input: UserInput }) => Users.create({ input }),
    updateUser: (_: any, { input }: { input: UserInput }, context: Context) => {
      if (context.err) {
        throw context.err;
      }

      if (!context.user) {
        throw "User not found";
      }

      return Users.update({ id: context.user.id, input });
    },
    deleteUser: (_: any, __: any, context: Context) => {
      if (context.err) {
        throw context.err;
      }

      if (!context.user) {
        throw "User not found";
      }

      return Users.delete({ id: context.user.id });
    },
  },
};

export default resolvers;
