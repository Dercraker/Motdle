import { Group } from "@mantine/core";
import FeatureCard, { FeatureCardProps } from "./FeatureCard";

interface featureSectionProps {
  features: FeatureCardProps[];
}

const FeatureSection = ({ features }: featureSectionProps) => {
  return (
    <Group justify="space-evenly" align="start">
      {features.map((card, index) => {
        return <FeatureCard key={index} {...card} />;
      })}
    </Group>
  );
};

export default FeatureSection;
