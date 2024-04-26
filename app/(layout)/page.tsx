import MotdleDetail from "@/features/landing/LandingDetail";
import MotdleExamples from "@/features/landing/MotdleExmples";
import FeatureSection from "@/features/landing/feature/FeatureSection";
import { Space, Stack } from "@mantine/core";

const RoutePage = () => {
  return (
    <Stack align="center">
      <MotdleDetail />
      <Space h="xl" />

      <MotdleExamples />
      <Space h="xl" />

      <FeatureSection
        features={[
          {
            feature: {
              title: "Jouez à volonté",
              description:
                "Autemps de parties que vous voulez, quand vous voulez !",
              features: [
                "Un nombre illimité de parties !",
                "Des mots aléatoires à chaque partie",
              ],
            },
          },
          {
            feature: {
              title: "Défiez vos amis",
              description:
                "Une seule partie par jour est possible, alors soyez stratégique !",
              features: [
                "Un nouveau mot par jour",
                "Une seule partie par jour",
                "Classement des meilleurs joueurs",
                "Partagez votre score sur les réseaux sociaux",
              ],
              badge: "bientôt disponible",
            },
          },
        ]}
      />
    </Stack>
  );
};

export default RoutePage;
