"use client";

import { theme } from "@/styles/theme";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 30, // 1000ms * 60s * 30m
      retry: 2,
    },
  },
});

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <SessionProvider>
        <Notifications limit={5} position="top-right" />
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </MantineProvider>
  );
};
