import useKeyPress from "@/hooks/useKeyPress";
import {
  CharacterStateSchema,
  CharacterStateType,
} from "@/lib/zod/Motdle/CharacterState.schema";
import { LineType } from "@/lib/zod/Motdle/Line.schema";
import styles from "@/styles/Key.module.css";
import { Group, Kbd } from "@mantine/core";

interface CellsProps {
  gameBoard: LineType[];
  disableCursor?: boolean;
  onKeyActivated?: (key: string) => void;
}

const Cells = (props: CellsProps) => {
  const GetStyle = (state: CharacterStateType) => {
    switch (state) {
      case CharacterStateSchema.Enum.present:
        return styles.present;
      case CharacterStateSchema.Enum.absent:
        return styles.absent;
      case CharacterStateSchema.Enum.correct:
        return styles.correct;
      case CharacterStateSchema.Enum.idle:
        return styles.idle;
    }
  };

  useKeyPress((keyEvent) =>
    props.onKeyActivated
      ? props.onKeyActivated(keyEvent.key.toUpperCase())
      : undefined,
  );

  return props.gameBoard.map((row, rowIndex) => (
    <Group key={rowIndex} gap="xs" justify="center" align="center">
      {row.map((cell, cellIndex) => {
        const style = GetStyle(cell.state);

        return (
          <Kbd
            id={rowIndex + "-" + cellIndex}
            key={cellIndex}
            className={`${style} ${styles.key}`}
            style={props.disableCursor ? { cursor: "not-allowed" } : {}}
            size="xl"
            mih="xl"
            miw="xl"
            onClick={(e) =>
              props.onKeyActivated
                ? props.onKeyActivated((e.target as any).textContent)
                : undefined
            }
          >
            {cell.character}
          </Kbd>
        );
      })}
    </Group>
  ));
};

export default Cells;
