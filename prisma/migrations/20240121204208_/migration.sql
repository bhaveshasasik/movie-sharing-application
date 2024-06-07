/*
  Warnings:

  - You are about to drop the column `playlistId` on the `Movie` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_playlistId_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "playlistId";

-- CreateTable
CREATE TABLE "MoviePlaylistJunction" (
    "movieId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MoviePlaylistJunction_pkey" PRIMARY KEY ("playlistId","movieId")
);

-- AddForeignKey
ALTER TABLE "MoviePlaylistJunction" ADD CONSTRAINT "MoviePlaylistJunction_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoviePlaylistJunction" ADD CONSTRAINT "MoviePlaylistJunction_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoviePlaylistJunction" ADD CONSTRAINT "MoviePlaylistJunction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
