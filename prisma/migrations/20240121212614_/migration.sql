/*
  Warnings:

  - You are about to drop the column `userId` on the `MoviePlaylistJunction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MoviePlaylistJunction" DROP CONSTRAINT "MoviePlaylistJunction_userId_fkey";

-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_userId_fkey";

-- AlterTable
ALTER TABLE "MoviePlaylistJunction" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
