"use client";

import { ButtonProps } from "@mantine/core";
import { useSession } from "next-auth/react";
import { LoggedInButton } from "./LoggedInButton";
import { SignInButton } from "./SignInButton";

interface AuthButtonClientProps {
  buttonProps?: ButtonProps;
}

export const AuthButtonClient = ({ buttonProps }: AuthButtonClientProps) => {
  const session = useSession();

  if (session.data?.user) {
    const user = session.data.user;
    return <LoggedInButton user={user} />;
  }

  return <SignInButton buttonProps={buttonProps} />;
};
