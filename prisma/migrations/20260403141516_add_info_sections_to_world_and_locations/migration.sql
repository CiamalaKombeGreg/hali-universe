-- AlterTable
ALTER TABLE "LocationEntry" ADD COLUMN     "infoSections" JSONB,
ADD COLUMN     "notes" JSONB;

-- AlterTable
ALTER TABLE "WorldEntry" ADD COLUMN     "infoSections" JSONB,
ADD COLUMN     "notes" JSONB;
