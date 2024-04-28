/*
  Warnings:

  - The values [Idle,Win,Loose] on the enum `ScoreState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ScoreState_new" AS ENUM ('idle', 'playing', 'win', 'lose');
ALTER TABLE "Score" ALTER COLUMN "result" DROP DEFAULT;
ALTER TABLE "Score" ALTER COLUMN "result" TYPE "ScoreState_new" USING ("result"::text::"ScoreState_new");
ALTER TYPE "ScoreState" RENAME TO "ScoreState_old";
ALTER TYPE "ScoreState_new" RENAME TO "ScoreState";
DROP TYPE "ScoreState_old";
ALTER TABLE "Score" ALTER COLUMN "result" SET DEFAULT 'idle';
COMMIT;

-- AlterTable
ALTER TABLE "Score" ALTER COLUMN "result" SET DEFAULT 'idle';
