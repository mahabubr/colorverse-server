/*
  Warnings:

  - You are about to drop the column `pallerId` on the `Collection` table. All the data in the column will be lost.
  - Added the required column `palletId` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_pallerId_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "pallerId",
ADD COLUMN     "palletId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_palletId_fkey" FOREIGN KEY ("palletId") REFERENCES "Pallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
