/*
  Warnings:

  - The primary key for the `AuthToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `AuthToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuthToken" DROP CONSTRAINT "AuthToken_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "AuthToken_pkey" PRIMARY KEY ("id");
