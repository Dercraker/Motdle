"use server";

import { prisma } from "@/lib/prisma";
import { authAction } from "@/lib/server-actions/safe-actions";
import { CharacterStateSchema } from "@/lib/zod/Motdle/CharacterState.schema";
import { LineType } from "@/lib/zod/Motdle/Line.schema";
import {
  ConnectRowValidationSchema,
  ConnectRowValidationType,
} from "@/lib/zod/connectPlay/ConnectRowValidation.schema";
import { SaveCurrentLineAction } from "./SaveCurrentLine.action";

export const ValidateConnectMotdleRowAction = authAction(
  ConnectRowValidationSchema,
  async ({ row, slug, party }: ConnectRowValidationType, ctx) => {
    const data = await prisma.word.findFirst({
      where: {
        id: slug,
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

    await SaveCurrentLineAction({
      row: validationResult as LineType,
      partyId: party,
    });

    return validationResult;
  },
);
