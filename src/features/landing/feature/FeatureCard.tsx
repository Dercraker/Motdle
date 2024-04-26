"use client";

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
import { useMemo } from "react";

type FeatureLine = {
  title: string;
  description: string;
  features: string[];
  badge?: string;
};

export interface FeatureCardProps {
  feature: FeatureLine;
}

const FeatureCard = ({ feature: props }: FeatureCardProps) => {
  const features = useMemo(() => {
    return props.features.map((feature, index) => {
      return <ListItem key={index}>{feature}</ListItem>;
    });
  }, [props.features]);

  const theme = useMantineTheme();

  return (
    <Paper p="xl" shadow="xs" bg={theme.colors.dark[5]} withBorder>
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
