"use server";

import { prisma } from "@/lib/prisma";
import { authAction } from "@/lib/server-actions/safe-actions";
import {
  SaveLineSchema,
  SaveLineType,
} from "@/lib/zod/connectPlay/SaveLine.schema";

export const SaveCurrentLineAction = authAction(
  SaveLineSchema,
  async ({ row, partyId }: SaveLineType, ctx) => {
    const party = await prisma.party.findFirst({
      where: {
        id: partyId,
      },
      include: {
        lines: true,
      },
    });

    const lineNumber = party?.lines.length || 0;

    await prisma.party.update({
      where: {
        id: partyId,
      },
      data: {
        lines: {
          create: {
            lineNumber: lineNumber,
            characters: {
              createMany: {
                data: row.map((cell, idx) => ({
                  letter: cell.character,
                  state: cell.state,
                })),
              },
            },
          },
        },
      },
    });
  },
);
