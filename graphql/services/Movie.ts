import prisma from "../prisma/client";
import { Optional } from "../typeDefs/utility";

type MovieInput = {
  name: string;
}

type MovieId = string;

export default class Movie {
  // CREATE
  static async create({ input }: { input: MovieInput }) {
    const { name } = input;
    return prisma.movie.create({
      data: {
        name,
      },
    });
  }  

  // READ
  static async find({ id }: { id: MovieId }) {
    return prisma.movie.findUnique({ where: { id } });
  }

  static async findAll({ name, description }: { name: Optional<string>, description: Optional<string> }) {
    const args: any[] = [];

    if (name) {
      args.push({
        name: {
          contains: name
        }
      });
    }

    if (description) {
      args.push({
        description: {
          contains: description
        }
      });
    }

    return args.length ? prisma.movie.findMany({
      where: {
        OR: args
      }
    }) : prisma.movie.findMany();
  }
}
