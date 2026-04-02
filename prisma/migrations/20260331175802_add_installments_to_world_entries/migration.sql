-- AlterEnum
ALTER TYPE "WorldEntryType" ADD VALUE 'INSTALLMENT';

-- AlterTable
ALTER TABLE "WorldEntry" ADD COLUMN     "installmentCode" TEXT,
ADD COLUMN     "installmentOrder" INTEGER;
