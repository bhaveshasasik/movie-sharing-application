import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import resolvers from "@/graphql/resolvers";
import typeDefs from "@/graphql/typeDefs";
import AuthToken from "@/graphql/services/AuthToken";
import Context from "@/graphql/typeDefs/context";

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res): Promise<Context> => {
    const { user, token, err } = await AuthToken.getLoggedInUser();
    return {req, res, user, token, err};
  },
});

export { handler as GET, handler as POST };