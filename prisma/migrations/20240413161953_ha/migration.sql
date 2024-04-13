/*
  Warnings:

  - You are about to drop the `Pallete` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pallete" DROP CONSTRAINT "Pallete_userId_fkey";

-- DropTable
DROP TABLE "Pallete";

-- CreateTable
CREATE TABLE "Pallet" (
    "id" TEXT NOT NULL,
    "primary" JSONB NOT NULL,
    "secondary" JSONB NOT NULL,
    "accent" JSONB NOT NULL,
    "light" JSONB NOT NULL,
    "dark" JSONB NOT NULL,
    "tags" TEXT[],
    "likes" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pallet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pallet" ADD CONSTRAINT "Pallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
