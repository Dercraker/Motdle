"use client";

import { useHref } from "@/hooks/useHref";
import { Button } from "@mantine/core";

export const SignInButton = () => {
  const href = useHref();

  return (
    <Button
      component="a"
      href={`/auth/signin?callbackUrl=${href}`}
      variant="outline"
      radius="md"
    >
      Sign in
    </Button>
  );
};
