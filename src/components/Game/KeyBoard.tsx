import { Container, Group, Kbd, Stack } from "@mantine/core";

import useKeyPress from "@/hooks/useKeyPress";
import useNotify from "@/hooks/useNotify";
import { useGameStore } from "@/lib/zustand/gameStore";
import styles from "@/styles/KeyBoard.module.css";

export const KeyBoard = () => {
  const { ErrorNotify } = useNotify();
  const AddKey = useGameStore((state) => state.AddKey);
  const RemoveKey = useGameStore((state) => state.RemoveKey);

  const gameBoard: string[][] = [
    ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
    ["W", "X", "C", "V", "B", "N"],
  ];

  useKeyPress((keyEvent) => handleClickKey(keyEvent.key.toUpperCase()));

  const handleClickKey = (key: string) => {
    if (key === "ENTER") return;

    if (key === "BACKSPACE") return RemoveKey();

    const asciiCode = key.charCodeAt(0);
    if (key.length > 1 || asciiCode < 65 || asciiCode > 90) return;

    AddKey(key);
  };

  return (
    <Container my="xl">
      <Stack gap="xl" align="center" justify="center">
        {gameBoard.map((row, rowIndex) => (
          <Group key={rowIndex} gap="xs" justify="center" align="center">
            {row.map((cell, cellIndex) => (
              <Kbd
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
