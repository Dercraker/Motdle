import styles from "@/styles/Key.module.css";
import { Group, Kbd, Modal, Stack, Text, Title } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { WordleExemple } from "./WordleExemple";

export const TipsModal = () => {
  const [opened, setOpened] = useState<boolean>(true);

  return (
    <Modal.Root
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      size="xl"
    >
      <Modal.Overlay backgroundOpacity={0.55} blur={3} />
      <Modal.Content>
        <Modal.Body>
          <Stack>
            <Group align="center" justify="end">
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
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
