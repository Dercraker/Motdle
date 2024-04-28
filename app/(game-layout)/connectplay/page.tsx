"use client";

import ConnectMotdle from "@/features/connectPlay/ConnectMotdle";
import StatusCard from "@/features/connectPlay/StatusCard";
import useNotify from "@/hooks/useNotify";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

const RoutePage = () => {
  const { ErrorNotify } = useNotify();
  const route = useRouter();
  const session = useSession();

  const [queryParty, setQueryParty] = useQueryState("party");
  const [querySlug, setQuerySlug] = useQueryState("slug");

  // if (!session.data) {
  //   ErrorNotify({
  //     message: "Vous devez être connecté pour accéder à cette page",
  //   });
  //   route.push("/");
  // }

  const [displayStatusCard, { close: closeStatusCard }] = useDisclosure(true);
  const [displayGame, { open: openGame }] = useDisclosure(false);

  const handleLoadParty = () => {
    closeStatusCard();
    openGame();
  };

  return (
    <>
      {displayStatusCard && session.data?.user?.id && (
        <StatusCard
          userId={session.data?.user?.id}
          LoadParty={handleLoadParty}
        />
      )}
      {!displayStatusCard && displayGame && querySlug && queryParty && (
        <ConnectMotdle wantedSlug={querySlug} partyId={queryParty} />
      )}
    </>
  );
};

export default RoutePage;
