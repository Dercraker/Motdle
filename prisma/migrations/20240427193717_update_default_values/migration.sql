/*
  Warnings:

  - You are about to drop the column `day` on the `WordOfTheDay` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Party" ALTER COLUMN "playDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Score" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "WordOfTheDay" DROP COLUMN "day",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
