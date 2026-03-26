/*
  Warnings:

  - You are about to drop the column `description` on the `AbilityNode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AbilityNode" DROP COLUMN "description",
ADD COLUMN     "contentBlocks" JSONB,
ADD COLUMN     "mainImageId" TEXT,
ADD COLUMN     "status" "AbilityNodeStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "isActive" SET DEFAULT false;

-- AlterTable
ALTER TABLE "AbilityNodeImage" ADD COLUMN     "storageKey" TEXT,
ALTER COLUMN "abilityNodeId" DROP NOT NULL;

-- DropEnum
DROP TYPE "AbilityContentBlockType";

-- DropEnum
DROP TYPE "AbilityReferenceType";

-- CreateIndex
CREATE INDEX "AbilityNode_status_idx" ON "AbilityNode"("status");

-- AddForeignKey
ALTER TABLE "AbilityNode" ADD CONSTRAINT "AbilityNode_mainImageId_fkey" FOREIGN KEY ("mainImageId") REFERENCES "AbilityNodeImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
