import { Stack } from "@mantine/core";
import FeatureCard, { FeatureCardProps } from "./FeatureCard";

interface featureSectionProps {
  features: FeatureCardProps[];
}

const FeatureSection = ({ features }: featureSectionProps) => {
  return (
    <Stack>
      {features.map((card, index) => {
        return <FeatureCard key={index} {...card} />;
      })}
    </Stack>
  );
};

export default FeatureSection;
