/*
  Warnings:

  - You are about to drop the column `qauthorname` on the `Topic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "qauthorName" TEXT NOT NULL DEFAULT 'Unknown';

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "qauthorname";
