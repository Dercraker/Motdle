import { LogoSvg } from "@/components/svg/LogoSvg";
import { AuthButtonClient } from "@/features/auth/AuthButtonClient";
import { SiteConfig } from "@/site-config";
import styles from "@/styles/LandingHeader.module.css";
import { Container, Group, Title } from "@mantine/core";

export const LandingHeader = () => {
  return (
    <header className={styles.container}>
      <Container py="xs">
        <Group align="center" justify="space-between">
          <Group>
            <LogoSvg size={38} />
            <Title ta="center" order={3}>
              {SiteConfig.title}
            </Title>
          </Group>
          <AuthButtonClient />
        </Group>
      </Container>
    </header>
  );
};
