import { LandingHeader } from "@/components/layout/header/LandingHeader";
import LandingDetail from "@/features/landing/LandingDetail";
import FeatureSection from "@/features/landing/feature/FeatureSection";

const RoutePage = () => {
  return (
    <>
      <LandingHeader />

      <LandingDetail />
      <FeatureSection
        features={[
          {
            align: "left",
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
            align: "right",
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
            },
          },
        ]}
      />
    </>
  );
};

export default RoutePage;
