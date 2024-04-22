"use client";

import { LogoSvg } from "@/components/svg/LogoSvg";
import { SiteConfig } from "@/site-config";
import classes from "@/styles/LandingFooter.module.css";
import { Anchor, Container, Group, Title } from "@mantine/core";
import { IconBrandGithub, IconMail } from "@tabler/icons-react";

const links = [
  {
    link: `mailto:${SiteConfig.email.contact}`,
    label: "Contact",
    icon: <IconMail />,
  },
  {
    link: SiteConfig.social.github,
    label: "Github",
    icon: <IconBrandGithub />,
  },
];

export const LandingFooter = () => {
  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      href={link.link}
      size="sm"
      target="_blank"
    >
      <Group justify="center" align="center" gap="0">
        {link.icon}
        {link.label}
      </Group>
    </Anchor>
  ));

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Group>
          <LogoSvg size={38} />
          <Title ta="center" order={3}>
            {SiteConfig.title}
          </Title>
        </Group>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </footer>
  );
};
