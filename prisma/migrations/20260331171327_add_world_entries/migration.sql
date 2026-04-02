-- CreateEnum
CREATE TYPE "WorldEntryType" AS ENUM ('UNIVERSE', 'SERIES_COLLECTION', 'CONTINUITY', 'SPINOFF', 'FANMADE', 'ORIGINAL_CREATION', 'CROSSOVER');

-- CreateEnum
CREATE TYPE "WorldCanonStatus" AS ENUM ('CANON', 'SEMI_CANON', 'NON_CANON', 'ALTERNATE_CANON');

-- CreateEnum
CREATE TYPE "WorldCosmologyType" AS ENUM ('SINGLE_UNIVERSE', 'MULTIVERSE', 'COMPLEX_MULTIVERSE', 'HIGHER_DIMENSIONAL_STRUCTURE');

-- CreateEnum
CREATE TYPE "WorldVisibilityStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "WorldEntry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "summary" TEXT,
    "type" "WorldEntryType" NOT NULL,
    "canonStatus" "WorldCanonStatus",
    "cosmologyType" "WorldCosmologyType",
    "visibilityStatus" "WorldVisibilityStatus" NOT NULL DEFAULT 'DRAFT',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "sourceNote" TEXT,
    "inspirationNote" TEXT,
    "officialPublisher" TEXT,
    "creator" TEXT,
    "branchDescription" TEXT,
    "divergenceNote" TEXT,
    "approvalNote" TEXT,
    "sourceSeriesNote" TEXT,
    "isStandaloneContainer" BOOLEAN,
    "allowOriginalCreations" BOOLEAN,
    "allowOfficialSeries" BOOLEAN,
    "hasMultipleContinuities" BOOLEAN,
    "isFullyIndependent" BOOLEAN,
    "officialCrossover" BOOLEAN,
    "parentId" TEXT,
    "bannerImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorldEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorldEntryImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "storageKey" TEXT,
    "caption" TEXT,
    "altText" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "worldEntryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorldEntryImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorldEntryTag" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "worldEntryId" TEXT NOT NULL,

    CONSTRAINT "WorldEntryTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorldEntrySource" (
    "id" TEXT NOT NULL,
    "worldEntryId" TEXT NOT NULL,
    "sourceEntryId" TEXT NOT NULL,

    CONSTRAINT "WorldEntrySource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorldEntryAbility" (
    "id" TEXT NOT NULL,
    "worldEntryId" TEXT NOT NULL,
    "abilityNodeId" TEXT NOT NULL,

    CONSTRAINT "WorldEntryAbility_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorldEntry_slug_key" ON "WorldEntry"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "WorldEntry_bannerImageId_key" ON "WorldEntry"("bannerImageId");

-- CreateIndex
CREATE INDEX "WorldEntry_type_idx" ON "WorldEntry"("type");

-- CreateIndex
CREATE INDEX "WorldEntry_parentId_idx" ON "WorldEntry"("parentId");

-- CreateIndex
CREATE INDEX "WorldEntry_visibilityStatus_idx" ON "WorldEntry"("visibilityStatus");

-- CreateIndex
CREATE INDEX "WorldEntryTag_worldEntryId_idx" ON "WorldEntryTag"("worldEntryId");

-- CreateIndex
CREATE INDEX "WorldEntrySource_worldEntryId_idx" ON "WorldEntrySource"("worldEntryId");

-- CreateIndex
CREATE INDEX "WorldEntrySource_sourceEntryId_idx" ON "WorldEntrySource"("sourceEntryId");

-- CreateIndex
CREATE UNIQUE INDEX "WorldEntrySource_worldEntryId_sourceEntryId_key" ON "WorldEntrySource"("worldEntryId", "sourceEntryId");

-- CreateIndex
CREATE INDEX "WorldEntryAbility_worldEntryId_idx" ON "WorldEntryAbility"("worldEntryId");

-- CreateIndex
CREATE INDEX "WorldEntryAbility_abilityNodeId_idx" ON "WorldEntryAbility"("abilityNodeId");

-- CreateIndex
CREATE UNIQUE INDEX "WorldEntryAbility_worldEntryId_abilityNodeId_key" ON "WorldEntryAbility"("worldEntryId", "abilityNodeId");

-- AddForeignKey
ALTER TABLE "WorldEntry" ADD CONSTRAINT "WorldEntry_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "WorldEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldEntry" ADD CONSTRAINT "WorldEntry_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "WorldEntryImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldEntryImage" ADD CONSTRAINT "WorldEntryImage_worldEntryId_fkey" FOREIGN KEY ("worldEntryId") REFERENCES "WorldEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldEntryTag" ADD CONSTRAINT "WorldEntryTag_worldEntryId_fkey" FOREIGN KEY ("worldEntryId") REFERENCES "WorldEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldEntrySource" ADD CONSTRAINT "WorldEntrySource_worldEntryId_fkey" FOREIGN KEY ("worldEntryId") REFERENCES "WorldEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldEntrySource" ADD CONSTRAINT "WorldEntrySource_sourceEntryId_fkey" FOREIGN KEY ("sourceEntryId") REFERENCES "WorldEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldEntryAbility" ADD CONSTRAINT "WorldEntryAbility_worldEntryId_fkey" FOREIGN KEY ("worldEntryId") REFERENCES "WorldEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldEntryAbility" ADD CONSTRAINT "WorldEntryAbility_abilityNodeId_fkey" FOREIGN KEY ("abilityNodeId") REFERENCES "AbilityNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
