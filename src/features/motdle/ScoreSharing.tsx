import CopyButtonComponent from "@/components/ui/CopyButtonComponent";
import useNotify from "@/hooks/useNotify";
import { GetWordBySlugAction } from "@/lib/server-actions/GetWordBySlug.action";
import { getServerUrl } from "@/lib/server-url";
import { CharacterStateSchema } from "@/lib/zod/Motdle/CharacterState.schema";
import { LineType } from "@/lib/zod/Motdle/Line.schema";
import { Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface ScoreSharingProps {
  isWin: boolean;
  gameBoard: LineType[];
  slug: string;
}

const ScoreSharing = ({ isWin, gameBoard, slug }: ScoreSharingProps) => {
  const { ErrorNotify } = useNotify();
  let attemptCount = -1;
  gameBoard.map((row, rowIdx) => {
    if (row.every((cell) => cell.state === CharacterStateSchema.enum.correct))
      attemptCount = rowIdx + 1;

    if (attemptCount != -1) return;
  });

  const {
    data: word,
    isPending: fetchWord,
    error,
  } = useQuery({
    queryKey: [slug],
    queryFn: async () =>
      await GetWordBySlugAction(slug).catch((err) =>
        ErrorNotify({ title: err }),
      ),
  });
  if (word?.serverError || error)
    ErrorNotify({ title: "Erreur lors de la récupération du mot" });

  const grid = useMemo(() => {
    const colorGrid = gameBoard.map((row) => {
      const colorRow = row.map((cell) => {
        switch (cell.state) {
          case CharacterStateSchema.enum.correct:
            return "🟩";
          case CharacterStateSchema.enum.absent:
            return "🟥";
          case CharacterStateSchema.enum.present:
            return "🟨";
          case CharacterStateSchema.enum.idle:
            return "🔲";
        }
      });
      return colorRow.join("");
    });

    return (
      <Stack gap="0">
        {colorGrid.map((row, idx) => (
          <Group key={idx} gap="0">
            {row}
          </Group>
        ))}
      </Stack>
    );
  }, [gameBoard]);

  const gridString = useMemo(() => {
    let stringBuilder = `J'ai trouver en mot ${word?.data?.word.trim()} en ${attemptCount} tentative\n`;
    gameBoard.forEach((row) => {
      stringBuilder += row
        .map((cell) => {
          switch (cell.state) {
            case CharacterStateSchema.enum.correct:
              return "🟩";
            case CharacterStateSchema.enum.absent:
              return "🟥";
            case CharacterStateSchema.enum.present:
              return "🟨";
            case CharacterStateSchema.enum.idle:
              return "🔲";
          }
        })
        .join("");
      stringBuilder += "\n";
    });

    stringBuilder += `${getServerUrl()}/freeplay\n`;

    return stringBuilder;
  }, [word?.data?.word, gameBoard, attemptCount]);

  return (
    <>
      <Title order={3}>Partagez votre résultat avec vos amis !</Title>
      <Paper radius="lg" shadow="xl" p="xl" withBorder>
        <Stack align="center">
          <Group gap="5px">
            J'ai trouver en mot<Text fw="bold">{word?.data?.word.trim()}</Text>
            en
            <Text fw="bold">{attemptCount}</Text>
            tentative
          </Group>
          {grid}
          <Text fs="italic" c="dimmed">{`${getServerUrl()}/freeplay`}</Text>
        </Stack>
      </Paper>
      <CopyButtonComponent
        copyLabel="Copier le résultat"
        copiedLabel="Résultat copier"
        value={gridString}
      />
    </>
  );
};

export default ScoreSharing;
