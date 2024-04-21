import { useGameStore } from "@/lib/zustand/gameStore";
import { Container, Group, Kbd, Stack } from "@mantine/core";

export const Board = () => {
  const gameBoard = useGameStore((state) => state.currentBoard);

  return (
    <Container>
      <Stack gap="xl" align="center" justify="center">
        {gameBoard.map((row, rowIndex) => (
          <Group key={rowIndex} gap="xs" justify="center" align="center">
            {row.map((cell, cellIndex) => (
              <Kbd key={cellIndex} size="xl" mih="xl" miw="xl">
                {cell}
              </Kbd>
            ))}
          </Group>
        ))}
      </Stack>
    </Container>
  );
};
