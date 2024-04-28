"use server";

import { prisma } from "@/lib/prisma";
import { action } from "@/lib/server-actions/safe-actions";
import { SetNewDailyWordScheme } from "@/lib/zod/setNewDailyWord.schema";
import moment from "moment";
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

  const currentDate = moment().utc(true).startOf("day").format();
  console.log("🚀 ~ setNewDailyWordAction ~ currentDate:", currentDate);

  await prisma.wordOfTheDay.create({
    data: {
      date: currentDate,
      word: {
        connect: {
          id: newWord.id,
        },
      },
    },
  });
});
