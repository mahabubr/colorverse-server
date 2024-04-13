/*
  Warnings:

  - You are about to drop the column `contrubute` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "contrubute",
ADD COLUMN     "contribute" INTEGER NOT NULL DEFAULT 0;
