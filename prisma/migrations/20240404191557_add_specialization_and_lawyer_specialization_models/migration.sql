/*
  Warnings:

  - You are about to drop the column `experience` on the `LawyerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `specialization` on the `LawyerProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LawyerProfile" DROP COLUMN "experience",
DROP COLUMN "specialization";

-- CreateTable
CREATE TABLE "Specialization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Specialization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LawyerSpecialization" (
    "lawyerProfileId" INTEGER NOT NULL,
    "specializationId" INTEGER NOT NULL,

    CONSTRAINT "LawyerSpecialization_pkey" PRIMARY KEY ("lawyerProfileId","specializationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Specialization_name_key" ON "Specialization"("name");

-- CreateIndex
CREATE INDEX "idx_specialization_name" ON "Specialization"("name");

-- AddForeignKey
ALTER TABLE "LawyerSpecialization" ADD CONSTRAINT "LawyerSpecialization_lawyerProfileId_fkey" FOREIGN KEY ("lawyerProfileId") REFERENCES "LawyerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LawyerSpecialization" ADD CONSTRAINT "LawyerSpecialization_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
