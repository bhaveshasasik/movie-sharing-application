import AuthToken from "@/graphql/services/AuthToken";
import Context from "@/graphql/typeDefs/context";
import {UserId, UserPassword} from "@/graphql/typeDefs/User";

const resolvers = {
  Mutation: {
    login: (_: any, {userId, password}: {userId: UserId, password: UserPassword}) => AuthToken.login({
      userId,
      password
    }),
    logout: (_: any, __: any, context: Context) => {
      if (context.err) { // Can only logout if user is logged in
        throw context.err;
      }

      if (!context.token)
        throw "Token not found";

      return AuthToken.logout({ token: context.token });
    },
    deleteAllExceptForCurrentlyLoggedIn: async (_:any, __:any, context: Context) => {
      if (context.err) { // Can only delete if the request is authenticated
        throw context.err;
      }

      if (!context.token)
        throw "Token not found";

      return AuthToken.deleteAllExceptFor({token: context.token});
    },
    deleteAllAuthTokens: async (_: any, __: any, context: Context) => {
      if (context.err) { // Can only delete if the request is authenticated
        throw context.err;
      }

      if (!context.user)
        throw "User is null";

      return AuthToken.deleteAllForUser({ userId: context.user.id });
    },
  },
};

export default resolvers;
