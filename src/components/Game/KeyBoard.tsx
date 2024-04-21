import { Container, Group, Kbd, Stack } from "@mantine/core";

import useKeyPress from "@/hooks/useKeyPress";
import { useGameStore } from "@/lib/zustand/gameStore";
import keyStyles from "@/styles/Key.module.css";
import styles from "@/styles/KeyBoard.module.css";
import { ValidationResult } from "@/types/validationResult";
import { useEffect } from "react";

export const KeyBoard = () => {
  const AddKey = useGameStore((state) => state.AddKey);
  const RemoveKey = useGameStore((state) => state.RemoveKey);
  const ValidateWord = useGameStore((state) => state.ValidateWord);
  const isFullLine = useGameStore((state) => state.isFullLine);
  const validationResult = useGameStore((state) => state.validationResult);

  const gameBoard: string[][] = [
    ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
    ["W", "X", "C", "V", "B", "N"],
  ];

  useKeyPress((keyEvent) => handleClickKey(keyEvent.key.toUpperCase()));

  const handleClickKey = (key: string) => {
    if (isFullLine && key === "ENTER") ValidateWord();

    if (key === "BACKSPACE") return RemoveKey();

    const asciiCode = key.charCodeAt(0);
    if (key.length > 1 || asciiCode < 65 || asciiCode > 90) return;

    AddKey(key);
  };

  useEffect(() => {
    if (!validationResult) return;
    handleUpdateClass(validationResult);
  }, [validationResult]);

  const handleUpdateClass = (validations: ValidationResult[]) => {
    for (const validation of validations) {
      const key = document.getElementById(validation.char);
      if (!key) return;

      if (validation.state === 1) {
        key.classList.remove(keyStyles.error);
        key.classList.remove(keyStyles.warning);
        key.classList.add(keyStyles.success);
      } else if (validation.state === -1) {
        key.classList.remove(keyStyles.success);
        key.classList.remove(keyStyles.warning);
        key.classList.add(keyStyles.error);
      } else if (validation.state === 0) {
        key.classList.remove(keyStyles.success);
        key.classList.remove(keyStyles.error);
        key.classList.add(keyStyles.warning);
      }
    }
  };

  return (
    <Container my="xl">
      <Stack gap="xl" align="center" justify="center">
        {gameBoard.map((row, rowIndex) => (
          <Group key={rowIndex} gap="xs" justify="center" align="center">
            {row.map((cell, cellIndex) => (
              <Kbd
                id={cell}
                key={cellIndex}
                size="xl"
                mih="xl"
                miw="xl"
                className={styles.key}
                onClick={(e) => {
                  handleClickKey((e.target as any).textContent);
                }}
              >
                {cell}
              </Kbd>
            ))}
          </Group>
        ))}
      </Stack>
    </Container>
  );
};
