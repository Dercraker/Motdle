"use client";

import { LandingFooter } from "@/components/layout/footer/LandingFooter";
import { LandingHeader } from "@/components/layout/header/LandingHeader";
import { LayoutParams } from "@/types/next";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Suspense } from "react";

const RootLayout = ({ children }: LayoutParams<{}>) => {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <LandingHeader opened={opened} toggle={toggle} />

      <AppShell.Main>
        <Suspense>{children}</Suspense>
      </AppShell.Main>
      <LandingFooter />
    </AppShell>
  );
};

export default RootLayout;
