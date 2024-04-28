/*
  Warnings:

  - The `result` column on the `Score` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ScoreState" AS ENUM ('Idle', 'Win', 'Loose');

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "result",
ADD COLUMN     "result" "ScoreState" NOT NULL DEFAULT 'Idle';
