import createJiti from "jiti";
import { fileURLToPath } from "node:url";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/lib/server.ts");
jiti("./src/lib/client.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
