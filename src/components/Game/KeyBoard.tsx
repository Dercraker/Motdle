import { Container, Group, Kbd, Stack } from "@mantine/core";

import useKeyPress from "@/hooks/useKeyPress";
import { useGameStore } from "@/lib/zustand/gameStore";
import styles from "@/styles/KeyBoard.module.css";

export const KeyBoard = () => {
  const AddKey = useGameStore((state) => state.AddKey);

  const gameBoard: string[][] = [
    ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
    ["W", "X", "C", "V", "B", "N"],
  ];

  useKeyPress((keyEvent) => {
    console.log("🚀 ~ useKeyPress ~ KeyPressed:", keyEvent.key);
    AddKey(keyEvent.key.toUpperCase());
  });

  const handleClickKey = (evn) => {
    console.log("🚀 ~ handleClickKey ~ key", evn.target.textContent);

    AddKey(evn.target.textContent.toUpperCase());
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
                onClick={(e) => handleClickKey(e)}
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
