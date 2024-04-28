"use server";

import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

export const getRandomWordAction = async () => {
  const word = await prisma.word.findRandom();
  logger.info("getRandomWordAction", { word });
  return word?.id;
};
