import { List, ListItem, Stack, Text, Title } from "@mantine/core";
import { Container } from "@react-email/components";
import { useMemo } from "react";

type FeatureLine = {
  title: string;
  description: string;
  features: string[];
};

export interface FeatureCardProps {
  feature: FeatureLine;
  align?: "center" | "left" | "right";
}

const FeatureCard = ({
  feature: props,
  align = "center",
}: FeatureCardProps) => {
  const features = useMemo(() => {
    return props.features.map((feature, index) => {
      return <ListItem key={index}>{feature}</ListItem>;
    });
  }, [props.features]);

  return (
    <Container align={align}>
      <Stack>
        <Title>{props.title}</Title>
        <Text>{props.description}</Text>
        <List>{features}</List>
      </Stack>
    </Container>
  );
};

export default FeatureCard;
