/*
  Warnings:

  - You are about to drop the column `qauthorName` on the `Topic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "questionName" TEXT;

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "qauthorName";
