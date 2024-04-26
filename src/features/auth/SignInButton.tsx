"use client";

import { useHref } from "@/hooks/useHref";
import { Button, ButtonProps } from "@mantine/core";

interface SignInButtonProps {
  buttonProps?: ButtonProps;
}

export const SignInButton = ({ buttonProps }: SignInButtonProps) => {
  const href = useHref();

  return (
    <Button
      component="a"
      href={`/auth/signin?callbackUrl=${href}`}
      variant="outline"
      radius="md"
      {...buttonProps}
    >
      Sign in
    </Button>
  );
};
