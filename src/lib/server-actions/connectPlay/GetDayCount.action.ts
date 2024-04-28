"use server";

import { prisma } from "@/lib/prisma";
import { authAction } from "@/lib/server-actions/safe-actions";
import { NullSchema } from "@/lib/zod/Null.schema";

export const GetDayCountAction = authAction(NullSchema, async () => {
  const count = await prisma.wordOfTheDay.count();

  return count;
});
