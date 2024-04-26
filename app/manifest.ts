import { SiteConfig } from "@/utils/site-config";
import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: SiteConfig.title,
    short_name: SiteConfig.title,
    description: SiteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#1b1d1e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
};

export default manifest;
