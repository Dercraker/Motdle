"use client";

import { DEFAULT_THEME, createTheme, mergeMantineTheme } from "@mantine/core";
import "@mantine/core/styles.css";

const themeOverride = createTheme({
  defaultRadius: "md",
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
