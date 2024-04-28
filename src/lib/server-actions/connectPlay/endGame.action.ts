"use server";

import { prisma } from "@/lib/prisma";
import { ActionError, userAction } from "@/lib/server-actions/safe-actions";
import { EndGameSchema } from "@/lib/zod/connectPlay/EndGame.schema";
import moment from "moment";

export const endGameAction = userAction(EndGameSchema, async (input, ctx) => {
  const currentDate = moment().utc(true).startOf("day").format();

  const party = await prisma.party.findFirst({
    where: {
      userId: ctx.user.id,
      connectedParty: true,
      playDate: currentDate,
    },
    include: {
      score: true,
    },
  });
  if (!party) throw new ActionError("No party found");

  await prisma.score.update({
    where: {
      id: party?.score?.id,
    },
    data: {
      result: input,
    },
  });
});
