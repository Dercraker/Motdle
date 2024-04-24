import { SiteConfig } from "@/site-config";
// import MagicLinkMail from "@email/MagicLinkEmail";
import { logger } from "@/lib/logger";
import { sendEmail } from "@/lib/mail/sendEmail";
import { env } from "@/lib/server";
import MagicLinkMail from "@email/MagicLinkEmail";
import type { NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import ResendProvider from "next-auth/providers/resend";
import { getCredentialsProvider } from "./credentialsProvider";

type Providers = NonNullable<NextAuthConfig["providers"]>;

export const getNextAuthConfigProviders = (): Providers => {
  const providers: Providers = [
    ResendProvider({
      apiKey: env.RESEND_API_KEY,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const result = await sendEmail({
          from: SiteConfig.email.from,
          to: email,
          subject: `Sign in to ${SiteConfig.domain}`,
          react: MagicLinkMail({
            url,
          }),
        });

        if (result.error) {
          logger.error("Auth Resend Provider Error", result.error);
          throw new Error(`Failed to send email: ${result.error}`);
        }
      },
    }),
  ];

  if (env.AUTH_DISCORD_ID && env.AUTH_DISCORD_SECRET)
    providers.push(DiscordProvider);

  if (env.AUTH_GITHUB_ID && env.AUTH_GITHUB_SECRET) {
    providers.push(
      GitHubProvider({
        allowDangerousEmailAccountLinking: true,
      }),
    );
  }

  if (env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET)
    providers.push(GoogleProvider);

  if (SiteConfig.auth.password) providers.push(getCredentialsProvider());

  return providers;
};
