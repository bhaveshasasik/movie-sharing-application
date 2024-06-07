import prisma from "../prisma/client";
import {UserId} from "../typeDefs/User";
import {PlaylistId, PlaylistInput} from "../typeDefs/Playlist";
import {MovieId} from "@/graphql/typeDefs/Movie";
import {GraphQLError} from "graphql/error";

export default class Playlists {
  // CREATE
  static async create({ userId, input }: { userId: UserId, input: PlaylistInput }) {
    const { name } = input;
    return prisma.playlist.create({
      data: {
        userId,
        name,
      },
    });
  }

  // READ
  static async find({ id }: { id: PlaylistId }) {
    return prisma.playlist.findUnique({ where: { id } });
  }

  static async findAll() {
    return prisma.playlist.findMany();
  }

  // OTHER
  static async addMovie({ playlistId, movieId, userId }: { playlistId: PlaylistId, movieId: MovieId, userId: UserId }) {
    const playlist = await this.find({id: playlistId});

    if (!playlist) {
      throw new GraphQLError('Playlist not found', {
        extensions: {
          code: 'PLAYLIST_NOT_FOUND',
          http: {
            status: 404,
          },
        },
      });
    }

    if (playlist.userId != userId) {
      throw new GraphQLError('Edit access denied', {
        extensions: {
          code: 'EDIT_ACCESS_DENIED',
          http: {
            status: 403,
          },
        },
      });
    }

    try {
      await prisma.moviePlaylistJunction.create({
        data: {
          playlistId: playlistId,
          movieId: movieId
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  static async getMovies({ id }: { id: PlaylistId }) {
    const movieIds = await prisma.moviePlaylistJunction.findMany({
      where: {
        playlistId: id,
      },
      select: {
        movieId: true,
      },
    });
    return prisma.movie.findMany({
      where: {
        id: {
          in: movieIds.map((obj) => {
            return obj.movieId;
          }),
        },
      },
    });
  }
}
