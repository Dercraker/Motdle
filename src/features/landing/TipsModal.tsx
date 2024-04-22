import { LogoSvgWhite } from "@/components/svg/LogoSvgWhite";
import useCookie from "@/hooks/useCookie";
import styles from "@/styles/Key.module.css";
import {
  Button,
  Checkbox,
  Group,
  Kbd,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlayerPlay, IconX } from "@tabler/icons-react";
import { WordleExemple } from "./WordleExemple";

export const TipsModal = () => {
  const { GetCookie, SaveCookieWithExpireTime, DeleteCookie } = useCookie();

  const tipsCookie: boolean = GetCookie("Tips");
  const [opened, { close: closeModal }] = useDisclosure(!tipsCookie);

  return (
    <Modal.Root opened={opened} onClose={closeModal} centered size="xl">
      <Modal.Overlay backgroundOpacity={0.55} blur={3} />
      <Modal.Content>
        <Modal.Body>
          <Stack>
            <Group align="center" justify="end">
              <LogoSvgWhite size={48} />
              <Title>French Wordle Game</Title>
              <Modal.CloseButton icon={<IconX />} />
            </Group>
            <Text c="dimmed">
              {`Dans Wordle, l'objectif est de trouver un mot mystère de 5 lettres
              en seulement 6 tentatives. À chaque essai, tu proposes un mot de 5
              lettres. Après chaque tentative, le jeu te donne des indices pour
              chaque lettre du mot mystère pour t'aider à deviner plus
              facilement`}
            </Text>
            <WordleExemple
              word="FORME"
              letters="FOXME"
              label={
                <Text>
                  La lettre <Kbd className={styles.error}>X</Kbd> n&apos;est pas
                  présente dans le mot
                </Text>
              }
            />
            <WordleExemple
              word="DROIT"
              letters="DROTI"
              label={
                <Text>
                  Les lettres <Kbd className={styles.warning}>T</Kbd>{" "}
                  <Kbd className={styles.warning}>I</Kbd> sont présentes dans le
                  mot mais pas à la bonne place
                </Text>
              }
            />
            <WordleExemple
              word="JOUER"
              letters="JOUER"
              label={
                <Text>Toute les lettre sont présentes et à la bonne place</Text>
              }
            />

            <Checkbox
              checked={tipsCookie}
              label="Ne plus afficher"
              variant="outline"
              onClick={(evn) =>
                evn.currentTarget.checked
                  ? SaveCookieWithExpireTime("Tips", `true`, 90)
                  : DeleteCookie("Tips")
              }
            />
            <Button leftSection={<IconPlayerPlay />} onClick={closeModal}>
              Commencer à jouer !
            </Button>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
