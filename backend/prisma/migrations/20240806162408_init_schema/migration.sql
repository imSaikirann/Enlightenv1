-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_topicId_fkey";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
