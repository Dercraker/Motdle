import { SiteConfig } from "@/site-config";
import { LayoutParams } from "@/types/next";
import { ColorSchemeScript } from "@mantine/core";

import { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

const RootLayout = ({ children }: LayoutParams<{}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        {/* <link rel="shortcut icon" href="/favicon.svg" /> */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
