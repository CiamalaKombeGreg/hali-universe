-- CreateEnum
CREATE TYPE "AbilityNodeType" AS ENUM ('SYSTEM', 'SUBSYSTEM', 'ABILITY', 'ASSOCIATION_SYSTEM', 'ASSOCIATION_ABILITY');

-- CreateEnum
CREATE TYPE "AbilityFamilyType" AS ENUM ('BODY_ALTERATION', 'EXTERNAL_MANIPULATION', 'MENTAL_PERCEPTUAL', 'SPIRITUAL_SOUL', 'CREATION_SUMMONING', 'CONCEPTUAL_ABSTRACT', 'METAPOWER', 'DIMENSIONAL_MOVEMENT', 'DEFENSE_NEGATION', 'UTILITY_SUPPORT');

-- CreateTable
CREATE TABLE "AbilityNode" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "AbilityNodeType" NOT NULL,
    "family" "AbilityFamilyType",
    "description" TEXT,
    "shortDescription" TEXT,
    "notes" TEXT,
    "hierarchyLevel" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AbilityNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AbilityAssociationSource" (
    "id" TEXT NOT NULL,
    "resultNodeId" TEXT NOT NULL,
    "sourceNodeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AbilityAssociationSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AbilityNodeImage" (
    "id" TEXT NOT NULL,
    "abilityNodeId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "caption" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AbilityNodeImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AbilityNode_slug_key" ON "AbilityNode"("slug");

-- CreateIndex
CREATE INDEX "AbilityNode_type_idx" ON "AbilityNode"("type");

-- CreateIndex
CREATE INDEX "AbilityNode_family_idx" ON "AbilityNode"("family");

-- CreateIndex
CREATE INDEX "AbilityNode_parentId_idx" ON "AbilityNode"("parentId");

-- CreateIndex
CREATE INDEX "AbilityNode_name_idx" ON "AbilityNode"("name");

-- CreateIndex
CREATE INDEX "AbilityAssociationSource_resultNodeId_idx" ON "AbilityAssociationSource"("resultNodeId");

-- CreateIndex
CREATE INDEX "AbilityAssociationSource_sourceNodeId_idx" ON "AbilityAssociationSource"("sourceNodeId");

-- CreateIndex
CREATE UNIQUE INDEX "AbilityAssociationSource_resultNodeId_sourceNodeId_key" ON "AbilityAssociationSource"("resultNodeId", "sourceNodeId");

-- CreateIndex
CREATE INDEX "AbilityNodeImage_abilityNodeId_idx" ON "AbilityNodeImage"("abilityNodeId");

-- CreateIndex
CREATE INDEX "AbilityNodeImage_sortOrder_idx" ON "AbilityNodeImage"("sortOrder");

-- AddForeignKey
ALTER TABLE "AbilityNode" ADD CONSTRAINT "AbilityNode_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "AbilityNode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbilityAssociationSource" ADD CONSTRAINT "AbilityAssociationSource_resultNodeId_fkey" FOREIGN KEY ("resultNodeId") REFERENCES "AbilityNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbilityAssociationSource" ADD CONSTRAINT "AbilityAssociationSource_sourceNodeId_fkey" FOREIGN KEY ("sourceNodeId") REFERENCES "AbilityNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbilityNodeImage" ADD CONSTRAINT "AbilityNodeImage_abilityNodeId_fkey" FOREIGN KEY ("abilityNodeId") REFERENCES "AbilityNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
