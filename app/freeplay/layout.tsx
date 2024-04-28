"use client";

import { LandingFooter } from "@/components/layout/footer/LandingFooter";
import { Header } from "@/components/layout/header/Header";
import { LayoutParams } from "@/types/next";
import { FreePlayHeaderLinks } from "@/utils/navigationLink";
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
      <Header
        opened={opened}
        toggle={toggle}
        headerLinks={FreePlayHeaderLinks}
      />

      <AppShell.Main>
        <Suspense>{children}</Suspense>
      </AppShell.Main>
      <LandingFooter />
    </AppShell>
  );
};

export default RootLayout;
