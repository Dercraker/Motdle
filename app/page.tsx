"use client";

import { Board } from "@/components/Game/Board";
import { KeyBoard } from "@/components/Game/KeyBoard";
import { LandingFooter } from "@/components/layout/footer/LandingFooter";
import { LandingHeader } from "@/components/layout/header/LandingHeader";
import { TipsModal } from "@/features/landing/TipsModal";
import { Space } from "@mantine/core";

const RoutePage = () => {
  return (
    <>
      <LandingHeader />

      <TipsModal />

      <Space h="xl" />
      <Board />
      <Space h="xl" />
      <KeyBoard />
      <LandingFooter />
    </>
  );
};

export default RoutePage;
