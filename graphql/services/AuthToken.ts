import {UserId, UserPassword} from "@/graphql/typeDefs/User";
import User from "@/graphql/services/User";
import {GraphQLError} from "graphql/error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/graphql/prisma/client";
import { v4 as uuid_v4 } from 'uuid';
import ms from 'ms';
import {cookies} from "next/headers";

const secretKey = process.env.JWT_SECRET_KEY ?? "top secret";
const durationOfKey = process.env.DURATION_OF_TOKEN ?? "1h";

const saltRounds = 10;

type Payload = {
  userId: string,
  tokenId: string
};

export default class AuthToken {
  // CREATE
  static async create({userId, password}: { userId: UserId, password: UserPassword }) {
    // Fetch the user
    const user = await User.find({id: userId});
    if (!user) {
      throw new GraphQLError('User not found', {
        extensions: {
          code: 'USER_NOT_FOUND',
          http: {
            status: 404,
          },
        },
      });
    }

    // Compare passwords
    const correct_hash = user.password;

    if (!(await bcrypt.compare(password, correct_hash))) {
      throw new GraphQLError('Incorrect Password', {
        extensions: {
          code: 'INCORRECT_PASSWORD',
          http: {
            status: 403,
          },
        },
      });
    }

    // Create JWT Token
    const tokenId = uuid_v4();
    const payload = { userId, tokenId };

    const token = jwt.sign(payload, secretKey, {
      expiresIn: durationOfKey
    })

    // Store it in database
    const hashed = await bcrypt.hash(token, saltRounds);

    const now = new Date();

    await prisma.authToken.create({
      // @ts-ignore
      // Linting err does not understand the args
      // ??
      data: {
        id: tokenId,
        userId: userId,
        token: hashed,
        createdAt: now,
        expiresAt: new Date(now.getTime() + ms(durationOfKey))
      },
    })

    return token;
  }

  // DELETE
  static async delete({ token }: { token: string }) {
    const decoded = jwt.decode(token) as Payload;
    const id = decoded.tokenId;
    await prisma.authToken.delete({
      where: {
        id: id
      }
    });
    return true;
  }

  static async deleteAllExceptFor({ token }: { token: string }) {
    const decoded = jwt.decode(token) as Payload;
    const tokenId = decoded.tokenId;
    const userId = decoded.userId;
    await prisma.authToken.deleteMany({
      where: {
        userId: userId,
        NOT: {
          id: tokenId
        }
      }
    });
    return true;
  }

  static async deleteAllForUser({ userId }: { userId: UserId }) {
    await prisma.authToken.deleteMany({
      where: {
        userId: userId
      }
    })
    cookies().delete('authToken');
    return true;
  }

  static getUserId({token}: {token: string}) {
    const decoded = jwt.decode(token) as Payload;
    return decoded.userId;
  }

  // OTHER
  static async verify({token}: {token: string}) {
    // verify authenticity of jwt token
    const decoded = jwt.verify(token, secretKey) as Payload;
    const tokenId = decoded.tokenId;

    // Check if the token exists in our database
    const authEntry = await prisma.authToken.findUnique({
      where: {
        id: tokenId
      }
    })

    if (!authEntry) {
      throw new GraphQLError('Token not found', {
        extensions: {
          code: 'TOKEN_NOT_FOUND',
          http: {
            status: 403,
          },
        },
      });
    }

    const hashedToken = authEntry.token;

    // Check if the token matches in our database
    if (!await bcrypt.compare(token, hashedToken)) {
      throw new GraphQLError('Token not match', {
        extensions: {
          code: 'TOKEN_NOT_MATCH',
          http: {
            status: 403,
          },
        },
      });
    }

    // Check if it has expired according to our database
    const now = new Date();
    if (now > authEntry.expiresAt) {
      throw new GraphQLError('Token expired', {
        extensions: {
          code: 'TOKEN_EXPIRED',
          http: {
            status: 403,
          },
        },
      });
    }

    return decoded;
  }

  static async verifyAndGetUser({token}: {token: string}) {
    const decoded = await AuthToken.verify({token});
    const userId = decoded.userId;
    return await User.find({id: userId});
  }

  static async login({userId, password}: {userId: UserId, password: UserPassword}) {
    const token = await AuthToken.create({userId: userId, password: password});
    cookies().set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      path: '/',
    })
    return true;
  }

  static async logout({token}: {token: string}) {
    await AuthToken.delete({token});
    cookies().delete('authToken');
    return true;
  }

  static async getLoggedInUser() {
    try {
      const token = cookies().get("authToken")?.value;

      if (!token) {
        throw new GraphQLError('Not logged in', {
          extensions: {
            code: 'NOT_LOGGED_IN',
            http: {
              status: 404,
            },
          },
        });
      }

      const user = await AuthToken.verifyAndGetUser({token: token});
      return {user, token};
    }
    catch (err) {
      return {err};
    }
  }
}