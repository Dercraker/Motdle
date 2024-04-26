"use server";

import { action } from "@/lib/server-actions/safe-actions";
import {
  RowValidationSchema,
  RowValidationType,
} from "@/lib/zod/Motdle/RowValidation.schema";
import { prisma } from "../prisma";
import { CharacterStateSchema } from "../zod/Motdle/CharacterState.schema";

export const validateMotdleRowAction = action(
  RowValidationSchema,
  async ({ row, slug }: RowValidationType) => {
    const data = await prisma.word.findFirst({
      where: {
        id: slug,
      },
      select: {
        word: true,
      },
    });
    const wantedWord = (data?.word || "jouer").toUpperCase().split("");

    const validationResult = row.map((cell, idx) => {
      if (!wantedWord.includes(cell.character))
        return {
          ...cell,
          state: CharacterStateSchema.Enum.absent,
        };

      if (wantedWord[idx] === cell.character)
        return {
          ...cell,
          state: CharacterStateSchema.Enum.correct,
        };

      const characterCount = wantedWord.filter(
        (c) => c === cell.character,
      ).length;
      const currentCharacterCount = row.filter(
        (c) => c.character === cell.character,
      ).length;
      if (
        currentCharacterCount === 1 ||
        currentCharacterCount === characterCount
      )
        return {
          ...cell,
          state: CharacterStateSchema.Enum.present,
        };
      const currentCharacterAllIndexes: number[] = row
        .map((currentCell, currentIdx) => {
          if (currentCell.character === cell.character) return currentIdx;
        })
        .filter((idx) => idx !== undefined) as number[];
      for (let i = 0; i < characterCount; i++) {
        if (currentCharacterAllIndexes[i] === idx)
          return {
            ...cell,
            state: CharacterStateSchema.Enum.present,
          };
        else if (currentCharacterAllIndexes[i] !== idx)
          return {
            ...cell,
            state: CharacterStateSchema.Enum.absent,
          };
      }
    });

    return validationResult;
  },
);
