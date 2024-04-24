"use client";

import { LogoSvg } from "@/components/svg/LogoSvg";
import type { PageParams } from "@/types/next";
import { Card, Container, Group, Text } from "@mantine/core";

const Page = (props: PageParams) => {
  return (
    <Container>
      <Card withBorder w="50%" m="25%" p="xl" radius="lg">
        <Card.Section>
          <Group align="center">
            <LogoSvg size={48} />
            <Text fw="700" size="2em">
              Almost There!
            </Text>
          </Group>
          <Text>
            {`To complete the verification, head over to your email inbox. You'll
            find a magic link from us. Click on it, and you're all set!`}
          </Text>
        </Card.Section>
      </Card>
    </Container>
  );
};

export default Page;
