"use client";

import TimeLeftBefore from "@/components/ui/TimeLeftBefore";
import useNotify from "@/hooks/useNotify";
import { CreateNewGameAction } from "@/lib/server-actions/connectPlay/CreateNewGame.action";
import { GetDayCountAction } from "@/lib/server-actions/connectPlay/GetDayCount.action";
import { GetPartyOfTheDayAction } from "@/lib/server-actions/connectPlay/GetPartyOfTheDay.action";
import {
  Button,
  Center,
  Flex,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ScoreState } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useQueryState } from "nuqs";
import { MotdleConfig } from "../motdle/Motdle-Config";

interface StatusCardProps {
  userId: string;
  LoadParty: () => void;
}

const StatusCard = ({ userId, LoadParty }: StatusCardProps) => {
  const { ErrorNotify } = useNotify();
  const queryClient = useQueryClient();

  const [queryParty, setQueryParty] = useQueryState("party");
  const [querySlug, setQuerySlug] = useQueryState("slug");

  const { data: party, isPending: fetchParty } = useQuery({
    queryKey: ["Party", userId],
    queryFn: async () =>
      await GetPartyOfTheDayAction(null)
        .then((res) => {
          if (res.data) setQueryParty(res.data.id);
          if (res.data && res.data.wordOfTheDay)
            setQuerySlug(res.data.wordOfTheDay.wordId);
          return res;
        })
        .catch((error) => ErrorNotify({ title: error.message })),
    staleTime: -1,
  });

  const { data: dayCount, isPending: fetchDayCount } = useQuery({
    queryKey: ["DayCount"],
    queryFn: async () =>
      await GetDayCountAction(null)
        .then((res) => res)
        .catch((error) => ErrorNotify({ title: error.message })),
    staleTime: moment().endOf("day").diff(moment()),
  });

  const createNewGameMutation = useMutation({
    mutationFn: async ([userId]: [string]) => {
      const { serverError } = await CreateNewGameAction({ userId });
      if (serverError) throw new Error(serverError);
    },
    onError: (error) => {
      return ErrorNotify({ title: error.message });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["Party", userId] });
    },
  });

  const CreateGame = async () => {
    await createNewGameMutation.mutate([userId]);
  };

  return (
    <Center>
      <Paper radius="lg" shadow="xl" p="xl" withBorder my="md" w="30em">
        <Stack>
          <Title>Status de la partie du jour</Title>
          <Skeleton visible={fetchParty || fetchDayCount}>
            <Stack>
              <Flex direction="column">
                <Text>Jour n° {dayCount?.data}</Text>
                <Text>
                  Status :{" "}
                  {party?.data == null
                    ? "Non commencer"
                    : party.data?.score?.result !== ScoreState.playing
                      ? "Finie"
                      : "En cours"}
                </Text>
                {party?.data != null &&
                  party.data?.score?.result !== ScoreState.playing && (
                    <Text>
                      Résultat :{" "}
                      {party.data?.score?.result === ScoreState.win
                        ? "Gagner"
                        : "Perdu"}
                    </Text>
                  )}

                <TimeLeftBefore
                  label={
                    party?.data == null ||
                    party?.data?.score?.result !== ScoreState.playing
                      ? "Temps avant le prochain mot :"
                      : "Temps restant pour finir la partie :"
                  }
                  momentToLeft={MotdleConfig.resetDate}
                />
              </Flex>
              {party?.data == null ? (
                <Button
                  onClick={CreateGame}
                  disabled={createNewGameMutation.isPending}
                  loading={createNewGameMutation.isPending}
                >
                  Commencer la partie du jour
                </Button>
              ) : (
                <Button
                  onClick={LoadParty}
                  disabled={
                    createNewGameMutation.isPending || !querySlug || !queryParty
                  }
                  loading={
                    createNewGameMutation.isPending || !querySlug || !queryParty
                  }
                >
                  Accéder à la partie du jour
                </Button>
              )}
            </Stack>
          </Skeleton>
        </Stack>
      </Paper>
    </Center>
  );
};

export default StatusCard;
