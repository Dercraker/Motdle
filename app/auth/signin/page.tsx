"use client";

import { LogoSvg } from "@/components/svg/LogoSvg";
import { Card, Space, Stack, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignInProviders } from "./SignInProviders";

const RoutePage = () => {
  const session = useSession();
  const router = useRouter();

  if (session.data) {
    router.push("/");
  }

  return (
    <Card withBorder w="50%" mx="25%" py="xl">
      <Card.Section>
        <Stack align="center">
          <LogoSvg size={48} />
          <Text fw="700" size="2em">
            Sign in to your account
          </Text>
        </Stack>
      </Card.Section>
      <Space h="xl" />
      <Card.Section>
        <SignInProviders />
      </Card.Section>
    </Card>
  );
};

export default RoutePage;
