/*
  Warnings:

  - You are about to drop the `_QuestionTopics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_userId_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionTopics" DROP CONSTRAINT "_QuestionTopics_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionTopics" DROP CONSTRAINT "_QuestionTopics_B_fkey";

-- DropTable
DROP TABLE "_QuestionTopics";

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
