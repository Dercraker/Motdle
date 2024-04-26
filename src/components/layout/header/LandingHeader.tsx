"use client";

import { LogoSvg } from "@/components/svg/LogoSvg";
import { AuthButtonClient } from "@/features/auth/AuthButtonClient";
import styles from "@/styles/LandingLayout.module.css";
import { LandingHeaderLinks } from "@/utils/navigationLink";
import { SiteConfig } from "@/utils/site-config";
import { AppShell, Burger, Group, Title, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface LandingHeaderProps {
  opened: boolean;
  toggle: () => void;
}

export const LandingHeader = ({ opened, toggle }: LandingHeaderProps) => {
  const router = useRouter();

  const handleClickMenuLink = (link: string) => {
    if (opened) toggle();
    router.push(link);
  };

  const links = useMemo(() => {
    return LandingHeaderLinks.map((link) => (
      <UnstyledButton
        key={link.label}
        className={styles.control}
        onClick={() => router.push(link.href)}
      >
        <Group gap="3px">
          {link.icon}
          {link.label}
        </Group>
      </UnstyledButton>
    ));
  }, [LandingHeaderLinks]);

  return (
    <>
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group>
            <LogoSvg size={38} />
            <Title ta="center" order={3}>
              {SiteConfig.title}
            </Title>
          </Group>
          <Group justify="space-between" style={{ flex: 1 }} visibleFrom="sm">
            <Group style={{ flex: 1 }}>{links}</Group>
            <AuthButtonClient />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar py="md" px={4}>
        <Group>
          <LogoSvg size={38} />
          <Title ta="center" order={3}>
            {SiteConfig.title}
          </Title>
        </Group>
        {links}
        <Group>
          <AuthButtonClient buttonProps={{ fullWidth: true, mx: "sm" }} />
        </Group>
      </AppShell.Navbar>
    </>
  );
};
