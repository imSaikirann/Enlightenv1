/*
  Warnings:

  - You are about to drop the column `authorId` on the `Answers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_authorId_fkey";

-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "authorId",
ADD COLUMN     "topicId" TEXT;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
