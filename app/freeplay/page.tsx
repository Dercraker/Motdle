"use client";

import Rules from "@/features/freePlay/Rules";
import Motdle from "@/features/motdle/Motdle";
import useNotify from "@/hooks/useNotify";
import { getRandomWordAction } from "@/lib/server-actions/getRandomWord.action";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

const RoutePage = () => {
  const [slug, setSlug] = useQueryState("slug");
  const { ErrorNotify } = useNotify();

  const [gameIsStarted, setGameIsStarted] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const slug = await getRandomWordAction();
      if (!slug) {
        return ErrorNotify({});
      }

      setSlug(slug);
    })();
  }, []);

  return (
    <>
      {!gameIsStarted || !slug ? (
        <Rules StartGame={() => setGameIsStarted(true)} gameIsReady={!slug} />
      ) : (
        <Motdle wantedWord={slug} />
      )}
    </>
  );
};

export default RoutePage;
