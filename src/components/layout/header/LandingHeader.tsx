import { LogoSvg } from "@/components/svg/LogoSvg";
import { SiteConfig } from "@/site-config";
import styles from "@/styles/LandingHeader.module.css";
import { Container, Group, Title } from "@mantine/core";

export const LandingHeader = () => {
  return (
    <header className={styles.container}>
      <Container>
        <Group>
          <LogoSvg size={38} />
          <Title ta="center" order={3}>
            {SiteConfig.title}
          </Title>
        </Group>
      </Container>
    </header>
  );
};
