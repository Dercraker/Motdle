import styles from "@/styles/Key.module.css";
import { Container, Kbd, Text } from "@mantine/core";
import { WordleExemple } from "./WordleExemple";

const LandingDetail = () => {
  return (
    <Container>
      <Text>
        {`Dans Motdle, l'objectif est de trouver un mot mystère de 5 lettres
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
            <Kbd className={styles.warning}>I</Kbd> sont présentes dans le mot
            mais pas à la bonne place
          </Text>
        }
      />
      <WordleExemple
        word="JOUER"
        letters="JOUER"
        label={<Text>Toute les lettre sont présentes et à la bonne place</Text>}
      />
    </Container>
  );
};

export default LandingDetail;
