"use client";

import { validateMotdleRowWithValueAction } from "@/lib/server-actions/validateMotdleRowWithValue.action";
import { CharacterType } from "@/lib/zod/Motdle/Character.schema";
import { CharacterStateSchema } from "@/lib/zod/Motdle/CharacterState.schema";
import { LineType } from "@/lib/zod/Motdle/Line.schema";
import styles from "@/styles/Key.module.css";
import { Group, Kbd, Skeleton, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useId, useMemo } from "react";
import GetStyle from "../motdle/GetStyle";

export type WordleExempleProps = {
  word: string;
  letters: string;
  label: JSX.Element;
};

export const MotdleExemple = ({ word, letters, label }: WordleExempleProps) => {
  const id = useId();

  const charactersToCheck: LineType = useMemo(
    () =>
      letters
        .toUpperCase()
        .split("")
        .map(
          (char: string) =>
            ({
              state: CharacterStateSchema.enum.idle,
              character: char,
            }) as CharacterType,
        ),
    [letters],
  );

  const { data: validatedLetters, isPending } = useQuery({
    queryKey: ["Motdle", "Exemple", letters],
    queryFn: async () =>
      await validateMotdleRowWithValueAction({
        row: charactersToCheck,
        slug: word,
      }).then((res) => res.data as LineType),
  });

  return (
    <Stack gap="xs" align="center" justify="center">
      <Group>
        Mot actuel : <Text fw="700">{word}</Text>
      </Group>
      {isPending ? (
        <Skeleton height={51} width={245} />
      ) : (
        <Group gap="xs" justify="center" align="center">
          {validatedLetters?.map((cell, idx) => {
            const style = GetStyle(cell.state);

            return (
              <Kbd
                id={id + cell}
                key={idx}
                className={`${style} ${styles.key}`}
                size="xl"
                mih="xl"
                miw="xl"
              >
                {cell.character}
              </Kbd>
            );
          })}
        </Group>
      )}
      {label}
    </Stack>
  );
};
