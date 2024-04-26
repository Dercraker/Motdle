import { CharacterType } from "@/lib/zod/Motdle/Character.schema";
import { LineType } from "@/lib/zod/Motdle/Line.schema";
import { Container, Stack } from "@mantine/core";
import { useCallback, useMemo } from "react";
import Cells from "./Cells";

interface KeyBoardProps {
  gameBoard: LineType[];
  isEventListenerEnabled?: boolean;
  AddCharacter: (key: string) => void;
}

const KeyBoard = ({
  gameBoard,
  AddCharacter,
  isEventListenerEnabled,
}: KeyBoardProps) => {
  const keyBoardLayout: string[][] = useMemo(
    () => [
      ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
      ["W", "X", "C", "V", "B", "N"],
      ["↵", "⌫"],
    ],
    [],
  );

  const GetCell = useCallback(
    (value: string): CharacterType | null => {
      let character: CharacterType | null = null;

      gameBoard.reverse().map((row, rowIndex) => {
        row.map((cell, cellIndex) => {
          if (cell.character === value) {
            character = cell;
            return;
          }
        });
      });

      return character;
    },
    [gameBoard],
  );

  const keyBoard: LineType[] = useMemo(() => {
    return keyBoardLayout.map((row, rowIndex) => {
      return row.map((character, cellIndex) => {
        const cell = GetCell(character);
        return cell || { character: character, state: "idle" };
      });
    });
  }, [keyBoardLayout, GetCell]);

  return (
    <Container>
      <Stack>
        <Cells
          gameBoard={keyBoard}
          onKeyActivated={isEventListenerEnabled ? AddCharacter : () => {}}
        />
      </Stack>
    </Container>
  );
};

export default KeyBoard;
