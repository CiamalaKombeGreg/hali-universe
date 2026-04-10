-- CreateEnum
CREATE TYPE "GalleryImageSourceType" AS ENUM ('UPLOADED', 'EXTERNAL');

-- CreateTable
CREATE TABLE "GalleryPortfolio" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryPortfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "title" TEXT,
    "altText" TEXT,
    "externalLink" TEXT,
    "sourceType" "GalleryImageSourceType" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "storageKey" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GalleryPortfolio_name_idx" ON "GalleryPortfolio"("name");

-- CreateIndex
CREATE INDEX "GalleryImage_portfolioId_sortOrder_idx" ON "GalleryImage"("portfolioId", "sortOrder");

-- CreateIndex
CREATE INDEX "GalleryImage_title_idx" ON "GalleryImage"("title");

-- CreateIndex
CREATE INDEX "GalleryImage_altText_idx" ON "GalleryImage"("altText");

-- AddForeignKey
ALTER TABLE "GalleryImage" ADD CONSTRAINT "GalleryImage_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "GalleryPortfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
