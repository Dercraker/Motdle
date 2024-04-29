import CopyButtonComponent from "@/components/ui/CopyButtonComponent";
import useNotify from "@/hooks/useNotify";
import { GetWordBySlugAction } from "@/lib/server-actions/GetWordBySlug.action";
import { getServerUrl } from "@/lib/server-url";
import { CharacterStateSchema } from "@/lib/zod/Motdle/CharacterState.schema";
import { LineType } from "@/lib/zod/Motdle/Line.schema";
import { SiteConfig } from "@/utils/site-config";
import { Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  EmailIcon,
  EmailShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";
import { useMemo } from "react";

interface ScoreSharingProps {
  isWin: boolean;
  gameBoard: LineType[];
  slug: string;
  href: string;

  dayCount?: number;
  hideWord?: boolean;
}

const ScoreSharing = (props: ScoreSharingProps) => {
  const { ErrorNotify } = useNotify();
  let attemptCount = -1;
  props.gameBoard.map((row, rowIdx) => {
    if (row.every((cell) => cell.state === CharacterStateSchema.enum.correct))
      attemptCount = rowIdx + 1;

    if (attemptCount != -1) return;
  });

  const {
    data: word,
    isPending: fetchWord,
    error,
  } = useQuery({
    queryKey: [props.slug],
    queryFn: async () =>
      await GetWordBySlugAction(props.slug).catch((err) =>
        ErrorNotify({ title: err }),
      ),
    enabled: !props.hideWord,
  });
  if (word?.serverError || error)
    ErrorNotify({ title: "Erreur lors de la récupération du mot" });

  const grid = useMemo(() => {
    const colorGrid = props.gameBoard.map((row) => {
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
  }, [props.gameBoard]);

  const gridString = useMemo(() => {
    let stringBuilder = "";
    props.isWin
      ? (stringBuilder += `J'ai trouver le mot ${props.hideWord ? `du jour #${props.dayCount}` : word?.data?.word.trim()} en ${attemptCount} tentative\n`)
      : (stringBuilder += `J'ai perdu à motdle, je n'ai pas trouver le mot ${props.hideWord ? `du jour #${props.dayCount}` : word?.data?.word.trim()}\n`);
    props.gameBoard.forEach((row) => {
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
  }, [word?.data?.word, props.gameBoard, attemptCount, props.isWin]);

  const postTitle = useMemo(() => {
    if (props.isWin) return "J'ai gagné à Motdle !";
    return "J'ai perdu à Motdle (╯‵□′)╯︵┻━┻";
  }, [SiteConfig.title]);

  return (
    <>
      <Title order={3}>Partagez votre résultat avec vos amis !</Title>
      <Paper radius="lg" shadow="xl" p="xl" withBorder>
        <Stack align="center">
          <Group gap="5px">
            {props.isWin
              ? `J'ai trouver le mot ${props.hideWord ? `du jour #${props.dayCount}` : word?.data?.word.trim()}
            en
            ${attemptCount}
            tentative`
              : `J'ai perdu à motdle, je n'ai pas trouver le mot
                ${props.hideWord ? `du jour #${props.dayCount}` : word?.data?.word.trim()}`}
          </Group>
          {grid}
          <Text fs="italic" c="dimmed">{`${getServerUrl()}${props.href}`}</Text>
        </Stack>
      </Paper>
      <Group justify="space-between">
        <CopyButtonComponent
          copyLabel="Copier le résultat"
          copiedLabel="Résultat copier"
          value={gridString}
        />
        <Group>
          <RedditShareButton url={gridString} title={postTitle}>
            <RedditIcon size={32} round />
          </RedditShareButton>
          <TwitterShareButton url={gridString} title={postTitle}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <TelegramShareButton url={gridString} title={postTitle}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <EmailShareButton url={gridString} subject={postTitle}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </Group>
      </Group>
    </>
  );
};

export default ScoreSharing;
