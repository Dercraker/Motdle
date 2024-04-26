import { IconDeviceGamepad2, IconHome } from "@tabler/icons-react";

interface NavigationLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export const LandingHeaderLinks: NavigationLink[] = [
  {
    label: "Accueil",
    href: "/",
    icon: <IconHome />,
  },
  {
    label: "Partie Illimité",
    href: "/freeplay",
    icon: <IconDeviceGamepad2 />,
  },
];
