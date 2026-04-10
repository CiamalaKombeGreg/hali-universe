-- CreateEnum
CREATE TYPE "ArchiveEntryType" AS ENUM ('LOREBOOK', 'NOVEL');

-- CreateEnum
CREATE TYPE "ArchiveVisibilityStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "NovelChapterStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "ArchiveImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "storageKey" TEXT,
    "caption" TEXT,
    "altText" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArchiveImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lorebook" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "visibilityStatus" "ArchiveVisibilityStatus" NOT NULL DEFAULT 'DRAFT',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "coverImageId" TEXT,
    "contentSections" JSONB,
    "linkedWorldIds" JSONB,
    "linkedLocationIds" JSONB,
    "linkedCharacterIds" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lorebook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Novel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "summary" TEXT,
    "visibilityStatus" "ArchiveVisibilityStatus" NOT NULL DEFAULT 'DRAFT',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "coverImageId" TEXT,
    "tags" JSONB,
    "linkedWorldId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Novel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NovelChapter" (
    "id" TEXT NOT NULL,
    "novelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "orderIndex" INTEGER NOT NULL,
    "status" "NovelChapterStatus" NOT NULL DEFAULT 'DRAFT',
    "coverImageId" TEXT,
    "contentBlocks" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NovelChapter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lorebook_slug_key" ON "Lorebook"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Lorebook_coverImageId_key" ON "Lorebook"("coverImageId");

-- CreateIndex
CREATE UNIQUE INDEX "Novel_slug_key" ON "Novel"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Novel_coverImageId_key" ON "Novel"("coverImageId");

-- CreateIndex
CREATE UNIQUE INDEX "NovelChapter_coverImageId_key" ON "NovelChapter"("coverImageId");

-- CreateIndex
CREATE UNIQUE INDEX "NovelChapter_novelId_slug_key" ON "NovelChapter"("novelId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "NovelChapter_novelId_orderIndex_key" ON "NovelChapter"("novelId", "orderIndex");

-- AddForeignKey
ALTER TABLE "Lorebook" ADD CONSTRAINT "Lorebook_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "ArchiveImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Novel" ADD CONSTRAINT "Novel_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "ArchiveImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Novel" ADD CONSTRAINT "Novel_linkedWorldId_fkey" FOREIGN KEY ("linkedWorldId") REFERENCES "WorldEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NovelChapter" ADD CONSTRAINT "NovelChapter_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NovelChapter" ADD CONSTRAINT "NovelChapter_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "ArchiveImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
