"use server";

import { prisma } from "@/lib/prisma";
import { ActionError, action } from "@/lib/server-actions/safe-actions";
import {
  GetWordWithSlugSchema,
  GetWordWithSlugType,
} from "../zod/Motdle/GetWordWithSlug.schema";

export const GetWordBySlugAction = action(
  GetWordWithSlugSchema,
  async (slug: GetWordWithSlugType) => {
    const word = await prisma.word.findFirst({
      where: {
        id: slug,
      },
    });

    if (!word) {
      throw new ActionError("Word not found");
    }

    return word;
  },
);
