import {NextApiRequest, NextApiResponse} from "next";
import User from "@/graphql/services/User";
import {UnpackedPromise} from "@/graphql/typeDefs/utility";

type Context = {
  req: NextApiRequest,
  res: NextApiResponse,
  err?: any,
  user?: UnpackedPromise<ReturnType<typeof User.find>>,
  token?: string
}

export default Context;