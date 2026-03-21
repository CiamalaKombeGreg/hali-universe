/*
  Warnings:

  - You are about to drop the column `scaling` on the `Verse` table. All the data in the column will be lost.
  - Added the required column `scaleTierId` to the `Verse` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ScaleSubTier" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Verse" DROP COLUMN "scaling",
ADD COLUMN     "scaleTierId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ScaleTier" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tierCode" TEXT NOT NULL,
    "tierName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subTier" "ScaleSubTier" NOT NULL,
    "hasPlus" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL,
    "dimension" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScaleTier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScaleTier_title_key" ON "ScaleTier"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ScaleTier_slug_key" ON "ScaleTier"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ScaleTier_sortOrder_key" ON "ScaleTier"("sortOrder");

-- AddForeignKey
ALTER TABLE "Verse" ADD CONSTRAINT "Verse_scaleTierId_fkey" FOREIGN KEY ("scaleTierId") REFERENCES "ScaleTier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
