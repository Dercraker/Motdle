"use server";

import { prisma } from "@/lib/prisma";

export const getRandomWordAction = async () => {
  const word = await prisma.word.findRandom();
  return word?.id;
};
