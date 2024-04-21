"use client";

import { theme } from "@/styles/theme";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import type { PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications limit={5} position="top-right" />
      {children}
    </MantineProvider>
  );
};
