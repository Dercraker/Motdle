"use client";

import styles from "@/styles/Key.module.css";
import { Group, Kbd, Stack, Text } from "@mantine/core";
import { useCallback, useEffect, useId } from "react";

export type WordleExempleProps = {
  word: string;
  letters: string;
  label: JSX.Element;
};

export const WordleExemple = ({ word, letters, label }: WordleExempleProps) => {
  const id = useId();

  const handleCheckExemple = useCallback(() => {
    let result = letters.split("").map((currentChar, i) => {
      if (currentChar === word[i]) return { state: 1, char: currentChar };
      if (word.includes(currentChar)) return { state: 0, char: currentChar };
      return { state: -1, char: currentChar };
    });

    return result;
  }, [word, letters]);

  useEffect(() => {
    if (!word || !letters || !label) return;

    const validations = handleCheckExemple();

    validations.map((validation, validationIndex) => {
      const currentCol = validationIndex;

      const key = document.getElementById(`${id + validation.char}`);

      if (!key || key.textContent !== validation.char) return;

      if (validation.state === 1) {
        key.classList.remove(styles.error);
        key.classList.remove(styles.warning);
        key.classList.add(styles.success);
      } else if (validation.state === -1) {
        key.classList.remove(styles.success);
        key.classList.remove(styles.warning);
        key.classList.add(styles.error);
      } else if (validation.state === 0) {
        key.classList.remove(styles.success);
        key.classList.remove(styles.error);
        key.classList.add(styles.warning);
      }

      return null;
    });
  }, [id, word, letters, label, handleCheckExemple]);

  return (
    <Stack gap="xs" align="center" justify="center">
      <Group>
        Mot actuel : <Text fw="700">{word}</Text>
      </Group>
      <Group gap="xs" justify="center" align="center">
        {letters.split("").map((letter, index) => (
          <Kbd
            id={id + letter}
            key={index}
            className={styles.key}
            size="xl"
            mih="xl"
            miw="xl"
          >
            {letter}
          </Kbd>
        ))}
      </Group>
      {label}
    </Stack>
  );
};
