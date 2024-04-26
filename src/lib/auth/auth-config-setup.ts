import type { User } from "next-auth";
import { resend } from "../mail/resend";
import { env } from "@/lib/server";

export const setupResendCustomer = async (user: User) => {
  if (!user.email) {
    return;
  }

  if (!env.RESEND_AUDIENCE_ID) {
    return;
  }

  const contact = await resend.contacts.create({
    audienceId: env.RESEND_AUDIENCE_ID,
    email: user.email,
    firstName: user.name ?? "",
    unsubscribed: false,
  });

  if (!contact.data) return;

  return contact.data.id;
};
