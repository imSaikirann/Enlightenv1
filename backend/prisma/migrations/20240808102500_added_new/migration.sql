/*
  Warnings:

  - You are about to drop the column `authorId` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the `Answers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_answeredPersonId_fkey";

-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_authorId_fkey";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "authorId",
ADD COLUMN     "questionId" TEXT;

-- DropTable
DROP TABLE "Answers";

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
