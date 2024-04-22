import { useGameStore } from "@/lib/zustand/gameStore";
import styles from "@/styles/Key.module.css";
import { ValidationResult } from "@/types/validationResult";
import { Container, Group, Kbd, Stack } from "@mantine/core";
import { useEffect } from "react";

export const Board = () => {
  const { gameBoard } = useGameStore();
  // const gameBoard = useGameStore((state) => state.gameBoard);
  const currentRow = useGameStore((state) => state.currentRow);
  const validationResult = useGameStore((state) => state.validationResult);

  useEffect(() => {
    handleUpdateClass(validationResult);
  }, [validationResult]);

  const handleUpdateClass = (validations: ValidationResult[]) => {
    validations.map((validation, validationIndex) => {
      const currentCol = validationIndex;

      const key = document.getElementById(`${currentRow - 1}-${currentCol}`);

      if (!key || key.textContent !== validation.char) return;
      console.log("🚀 ~ validations.map ~ key:", key);

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
  };

  return (
    <Container>
      <Stack gap="sm" align="center" justify="center">
        {gameBoard.map((row, rowIndex) => (
          <Group key={rowIndex} gap="xs" justify="center" align="center">
            {row.map((cell, cellIndex) => (
              <Kbd
                id={rowIndex + "-" + cellIndex}
                key={cellIndex}
                className={styles.key}
                style={{ cursor: "not-allowed" }}
                size="xl"
                mih="xl"
                miw="xl"
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
