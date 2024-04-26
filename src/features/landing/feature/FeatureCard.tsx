"use client";

import styles from "@/styles/FeatureCard.module.css";
import {
  Badge,
  List,
  ListItem,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export interface FeatureCardProps {
  title: string;
  description: string;
  features: string[];
  badge?: string;
  redirectOnClick?: string;
}

const FeatureCard = (props: FeatureCardProps) => {
  const router = useRouter();

  const features = useMemo(() => {
    return props.features.map((feature, index) => {
      return <ListItem key={index}>{feature}</ListItem>;
    });
  }, [props.features]);

  const theme = useMantineTheme();

  return (
    <Paper
      p="xl"
      shadow="xs"
      bg={theme.colors.dark[5]}
      withBorder
      className={styles.card}
      onClick={() => {
        props.redirectOnClick && router.push(props.redirectOnClick);
      }}
    >
      <Stack ta="start">
        {props.badge && <Badge variant="outline">{props.badge}</Badge>}
        <Title ta="start">{props.title}</Title>
        <Text>{props.description}</Text>
        <List>{features}</List>
      </Stack>
    </Paper>
  );
};

export default FeatureCard;
