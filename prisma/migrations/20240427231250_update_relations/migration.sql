-- DropForeignKey
ALTER TABLE "Charactere" DROP CONSTRAINT "Charactere_lineId_fkey";

-- DropForeignKey
ALTER TABLE "Line" DROP CONSTRAINT "Line_partyId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_partyId_fkey";

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Line" ADD CONSTRAINT "Line_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charactere" ADD CONSTRAINT "Charactere_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES "Line"("id") ON DELETE CASCADE ON UPDATE CASCADE;
