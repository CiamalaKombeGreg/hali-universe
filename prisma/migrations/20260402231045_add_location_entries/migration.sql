-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('WORLD', 'PLANET', 'CONTINENT', 'COUNTRY', 'REGION', 'CITY', 'BUILDING', 'ARENA', 'REALM', 'POCKET_DIMENSION', 'CONCEPTUAL_SPACE');

-- CreateEnum
CREATE TYPE "LocationOriginType" AS ENUM ('ORIGINAL', 'CANON', 'SPINOFF_DERIVED');

-- CreateTable
CREATE TABLE "LocationEntry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "locationType" "LocationType" NOT NULL,
    "originType" "LocationOriginType" NOT NULL,
    "canonStatus" "WorldCanonStatus",
    "orderIndex" INTEGER,
    "coordinateNote" TEXT,
    "parentWorldId" TEXT,
    "parentLocationId" TEXT,
    "bannerImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocationEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "storageKey" TEXT,
    "caption" TEXT,
    "altText" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "locationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LocationImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LocationEntry_slug_key" ON "LocationEntry"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LocationEntry_bannerImageId_key" ON "LocationEntry"("bannerImageId");

-- CreateIndex
CREATE INDEX "LocationEntry_parentWorldId_idx" ON "LocationEntry"("parentWorldId");

-- CreateIndex
CREATE INDEX "LocationEntry_parentLocationId_idx" ON "LocationEntry"("parentLocationId");

-- CreateIndex
CREATE INDEX "LocationEntry_locationType_idx" ON "LocationEntry"("locationType");

-- AddForeignKey
ALTER TABLE "LocationEntry" ADD CONSTRAINT "LocationEntry_parentWorldId_fkey" FOREIGN KEY ("parentWorldId") REFERENCES "WorldEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationEntry" ADD CONSTRAINT "LocationEntry_parentLocationId_fkey" FOREIGN KEY ("parentLocationId") REFERENCES "LocationEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationEntry" ADD CONSTRAINT "LocationEntry_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "LocationImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationImage" ADD CONSTRAINT "LocationImage_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "LocationEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
