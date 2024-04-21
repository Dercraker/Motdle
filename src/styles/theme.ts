"use client";

import { DEFAULT_THEME, createTheme, mergeMantineTheme } from "@mantine/core";
import "@mantine/core/styles.css";

const themeOverride = createTheme({
  defaultRadius: "md",

  colors: {
    dark: [
      DEFAULT_THEME.colors.dark[0],
      DEFAULT_THEME.colors.dark[1],
      DEFAULT_THEME.colors.dark[2],
      DEFAULT_THEME.colors.dark[3],
      "#766E61",
      DEFAULT_THEME.colors.dark[5],
      "#232627",
      "#1b1d1e",
      DEFAULT_THEME.colors.dark[8],
      DEFAULT_THEME.colors.dark[9],
    ],
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
