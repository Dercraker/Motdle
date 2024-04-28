"use server";

import { prisma } from "@/lib/prisma";
import { ActionError, userAction } from "@/lib/server-actions/safe-actions";
import { GameStatusSchema } from "@/lib/zod/Motdle/GameStatus.schema";
import { CreateNewGameSchema } from "@/lib/zod/connectPlay/CreateNewGame.schema";
import moment from "moment";

export const CreateNewGameAction = userAction(
  CreateNewGameSchema,
  async (input, ctx) => {
    const currentDate = moment().utc(true).startOf("day").format();

    const wordOfTheDay = await prisma.wordOfTheDay.findFirst({
      where: {
        date: currentDate,
      },
    });
    if (!wordOfTheDay)
      throw new ActionError(
        "Une erreur est survenue lors de la création de la partie",
      );

    const party = await prisma.party.findFirst({
      where: {
        userId: input.userId,
        connectedParty: true,
        wordOfTheDayId: wordOfTheDay.id,
        playDate: currentDate,
      },
    });
    if (party)
      throw new ActionError(
        "Vous avez déjà une partie en cours pour aujourd'hui",
      );

    const result = await prisma.party.create({
      data: {
        connectedParty: true,
        playDate: currentDate,
        user: {
          connect: {
            id: input.userId,
          },
        },
        wordOfTheDay: {
          connect: {
            id: wordOfTheDay?.id,
          },
        },
        score: {
          create: {
            user: {
              connect: {
                id: input.userId,
              },
            },
            result: GameStatusSchema.enum.playing,
          },
        },
      },
    });

    return result.id;
  },
);
