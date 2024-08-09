-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_topicId_fkey";

-- CreateTable
CREATE TABLE "_QuestionTopics" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionTopics_AB_unique" ON "_QuestionTopics"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionTopics_B_index" ON "_QuestionTopics"("B");

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionTopics" ADD CONSTRAINT "_QuestionTopics_A_fkey" FOREIGN KEY ("A") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionTopics" ADD CONSTRAINT "_QuestionTopics_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
