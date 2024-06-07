/*
  Warnings:

  - Added the required column `expiresAt` to the `AuthToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuthToken" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
