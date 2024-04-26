"use server";

import { prisma } from "@/lib/prisma";
import { action } from "@/lib/server-actions/safe-actions";
import { SetNewDailyWordScheme } from "@/lib/zod/setNewDailyWord.schema";
import { logger } from "../logger";

export const setNewDailyWordAction = action(SetNewDailyWordScheme, async () => {
  const words = await prisma.wordOfTheDay.findMany();

  const newWord = await prisma.word.findRandom({
    where: {
      id: {
        notIn: words.map((word) => word.wordId),
      },
    },
  });
  logger.info("🚀 ~ setNewDailyWordAction ~ newWord", newWord);

  if (!newWord) {
    throw new Error("No new words available");
  }

  await prisma.wordOfTheDay.create({
    data: {
      day: new Date(),
      word: {
        connect: {
          id: newWord.id,
        },
      },
    },
  });
});
