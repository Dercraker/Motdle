/*
  Warnings:

  - You are about to alter the column `word` on the `Word` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5)`.

*/
-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "word" SET DATA TYPE VARCHAR(5);
