"use client";

import { Board } from "@/components/Game/Board";
import { KeyBoard } from "@/components/Game/KeyBoard";
import { SiteConfig } from "@/site-config";
import { Space, Title } from "@mantine/core";

const Page = () => {
  return (
    <>
      <Title ta="center">{SiteConfig.title} is a French Wordle game</Title>
      <Space h="xl" />
      <Board />
      <Space h="xl" />
      <KeyBoard />
    </>
  );
};

export default Page;
