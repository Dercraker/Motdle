"use client";

import {
  Container,
  Divider,
  Group,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MagicLinkForm } from "./MagicLinkForm";
import { ProviderButton } from "./ProviderButton";

export const SignInProviders = () => {
  const { data: providers, isPending } = useQuery({
    queryFn: () => fetch(`/api/auth/providers`).then((res) => res.json()),
    queryKey: ["providers"],
  });

  if (isPending) {
    return (
      <Stack px="md">
        <Skeleton height={40} radius="xl" />
        <Skeleton height={40} radius="xl" />
        <Divider label="Or" labelPosition="center" my="lg" />
        <Skeleton height={40} radius="xl" />
        <Skeleton height={40} radius="xl" />
      </Stack>
    );
  }

  if (typeof providers !== "object") {
    return (
      <h1>Providers non dispo</h1>
      // <Alert>
      //   <AlertTriangle size={16} />
      //   <AlertTitle>
      //     The provider is not available. It's due to a misconfiguration in the
      //     <Typography variant="code">auth.ts</Typography> file.
      //   </AlertTitle>
      //   <AlertDescription>
      //     Please go to{" "}
      //     <Typography variant="link" as={Link} href="">
      //       the Now.TS documentation
      //     </Typography>{" "}
      //     to resolve the issue.
      //   </AlertDescription>
      // </Alert>
    );
  }
  return (
    <Container>
      {providers.resend && !providers.credentials ? (
        <>
          <MagicLinkForm />
          <Divider label="Or" labelPosition="center" my="lg" />
        </>
      ) : null}
      {/* {providers.credentials ? (
        <>
          <SignInCredentialsAndMagicLinkForm />
          <Divider label="Or" labelPosition="center" my="lg" />
        </>
      ) : null} */}
      <div className="flex flex-col gap-2">
        {/* ℹ️ Add provider you want to support here */}
        {providers.discord ? <ProviderButton providerId="discord" /> : null}
        {providers.github ? <ProviderButton providerId="github" /> : null}
      </div>
      {providers.credentials ? (
        <Group>
          <Text>
            {"You don't have an account ? "}
            <Text
              component="a"
              href="/auth/signup"
              fs="italic"
              td="underline"
              c="blue"
              style={{ cursor: "pointer" }}
            >
              Sign up
            </Text>
          </Text>
        </Group>
      ) : null}
    </Container>
  );
};
