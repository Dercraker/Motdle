import { useGameStore } from "@/lib/zustand/gameStore";
import keyStyles from "@/styles/Key.module.css";
import { ValidationResult } from "@/types/validationResult";
import { Container, Group, Kbd, Stack } from "@mantine/core";
import { useEffect } from "react";

export const Board = () => {
  const { gameBoard } = useGameStore();
  // const gameBoard = useGameStore((state) => state.gameBoard);
  const currentRow = useGameStore((state) => state.currentRow);
  const validationResult = useGameStore((state) => state.validationResult);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ validationResult:", validationResult);
    handleUpdateClass(validationResult);
  }, [validationResult]);

  const handleUpdateClass = (validations: ValidationResult[]) => {
    validations.map((validation, validationIndex) => {
      const currentCol = validationIndex;

      console.log(
        `🚀 ~ handleUpdateClass ~ ${currentRow - 1}-${currentCol}:`,
        `${currentRow - 1}-${currentCol}`,
      );

      const key = document.getElementById(`${currentRow - 1}-${currentCol}`);

      if (!key || key.textContent !== validation.char) return;
      console.log("🚀 ~ validations.map ~ key:", key);

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

      return null;
    });
  };

  return (
    <Container>
      <Stack gap="xl" align="center" justify="center">
        {gameBoard.map((row, rowIndex) => (
          <Group key={rowIndex} gap="xs" justify="center" align="center">
            {row.map((cell, cellIndex) => (
              <Kbd
                id={rowIndex + "-" + cellIndex}
                key={cellIndex}
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
