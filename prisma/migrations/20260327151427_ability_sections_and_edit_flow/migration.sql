/*
  Warnings:

  - You are about to drop the column `contentBlocks` on the `AbilityNode` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `AbilityNode` table. All the data in the column will be lost.
  - The `notes` column on the `AbilityNode` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AbilityNode" DROP COLUMN "contentBlocks",
DROP COLUMN "shortDescription",
ADD COLUMN     "contentSections" JSONB,
ADD COLUMN     "shortDescriptionParts" JSONB,
DROP COLUMN "notes",
ADD COLUMN     "notes" JSONB;
