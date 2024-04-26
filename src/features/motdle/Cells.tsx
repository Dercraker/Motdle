import useKeyPress from "@/hooks/useKeyPress";
import { LineType } from "@/lib/zod/Motdle/Line.schema";
import styles from "@/styles/Key.module.css";
import { Group, Kbd } from "@mantine/core";
import GetStyle from "./GetStyle";

interface CellsProps {
  gameBoard: LineType[];
  disableCursor?: boolean;
  isHoverable?: boolean;
  onKeyActivated?: (key: string) => void;
}

const Cells = (props: CellsProps) => {
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
            className={`${style} ${styles.key} ${props.isHoverable && styles.hover}`}
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
