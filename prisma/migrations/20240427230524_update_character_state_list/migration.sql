/*
  Warnings:

  - The values [NotPresent,BadPlace,GoodPlace] on the enum `characterState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "characterState_new" AS ENUM ('idle', 'correct', 'present', 'absent');
ALTER TABLE "Charactere" ALTER COLUMN "state" TYPE "characterState_new" USING ("state"::text::"characterState_new");
ALTER TYPE "characterState" RENAME TO "characterState_old";
ALTER TYPE "characterState_new" RENAME TO "characterState";
DROP TYPE "characterState_old";
COMMIT;
