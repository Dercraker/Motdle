"use server";

import { prisma } from "@/lib/prisma";
import { authAction } from "@/lib/server-actions/safe-actions";
import { GetPartyOfTheDaySchema } from "@/lib/zod/connectPlay/GetPartyOfTheDay.schema";
import moment from "moment";

/**
 * Get the party of the day for the connected user
 */
export const GetPartyOfTheDayAction = authAction(
  GetPartyOfTheDaySchema,
  async (input, ctx) => {
    const currentDate = moment().utc(true).startOf("day").format();

    const party = await prisma.party.findFirst({
      where: {
        userId: ctx.user.id,
        connectedParty: true,
        playDate: currentDate,
      },
      include: {
        lines: {
          include: {
            characters: true,
          },
        },
        score: true,
        wordOfTheDay: true,
      },
    });

    return party;
  },
);
