import prisma from "../prisma/client";
import {UserId, UserInput} from "@/graphql/typeDefs/User";
import bcrypt from 'bcrypt'

const saltRounds = 10;


export default class User {
  // CREATE
  static async create({ input }: {input: UserInput}) {
    const { id, name, password } = input;

    const hashed = await bcrypt.hash(password, saltRounds);

    return prisma.user.create({
      data: {
        id,
        name,
        //password: hashed,
      },
    });
  }

  // READ
  static async find({ id }: { id: UserId }) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  static async findMany({ ids }: { ids: UserId[] }) {
    return prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  // UPDATE
  static async update({ id, input }: { id: UserId, input: UserInput }) {
    try {
      input.password =  await bcrypt.hash(input.password, saltRounds);
      return await prisma.user.update({
        where: {
          id,
        },
        data: input,
      });
    } catch (e) {
      return null;
    }
  }

  // DELETE
  static async delete({ id }: { id: UserId }) {
    try {
      await prisma.user.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  // OTHER
  static async getPlaylists({ id }: { id: UserId }) {
    return prisma.playlist.findMany({
      where: {
        userId: id,
      },
    });
  }
}
