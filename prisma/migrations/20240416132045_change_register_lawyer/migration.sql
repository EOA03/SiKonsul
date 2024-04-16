/*
  Warnings:

  - Changed the type of `NIK` on the `Lawyer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Lawyer" ADD COLUMN     "address" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "specialization" TEXT,
ADD COLUMN     "university" TEXT,
DROP COLUMN "NIK",
ADD COLUMN     "NIK" INTEGER NOT NULL;
