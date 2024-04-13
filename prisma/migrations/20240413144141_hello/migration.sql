-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contrubute" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Pallete" (
    "id" TEXT NOT NULL,
    "primary" JSONB NOT NULL,
    "seconday" JSONB NOT NULL,
    "accent" JSONB NOT NULL,
    "light" JSONB NOT NULL,
    "dark" JSONB NOT NULL,
    "tags" TEXT[],
    "likes" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pallete_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pallete" ADD CONSTRAINT "Pallete_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
