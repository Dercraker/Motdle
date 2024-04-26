import styles from "@/styles/Key.module.css";
import { Kbd, Stack, Text } from "@mantine/core";
import { MotdleExemple } from "./MotdleExemple";

const MotdleExamples = () => {
  return (
    <Stack gap="xl">
      <MotdleExemple
        word="FORME"
        letters="FOXME"
        label={
          <Text>
            La lettre <Kbd className={styles.absent}>X</Kbd> n&apos;est pas
            présente dans le mot
          </Text>
        }
      />
      <MotdleExemple
        word="DROIT"
        letters="DROTI"
        label={
          <Text>
            Les lettres <Kbd className={styles.correct}>T</Kbd>{" "}
            <Kbd className={styles.correct}>I</Kbd> sont présentes dans le mot
            mais pas à la bonne place
          </Text>
        }
      />
      <MotdleExemple
        word="JOUER"
        letters="JOUER"
        label={<Text>Toute les lettre sont présentes et à la bonne place</Text>}
      />
    </Stack>
  );
};

export default MotdleExamples;
