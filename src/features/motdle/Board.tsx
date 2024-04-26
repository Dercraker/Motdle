import { LineType } from "@/lib/zod/Motdle/Line.schema";
import { Stack } from "@mantine/core";
import { Container } from "@react-email/components";
import Cells from "./Cells";

interface BoardV2Props {
  gameBoard: LineType[];
}

const Board = ({ gameBoard }: BoardV2Props) => {
  return (
    <Container>
      <Stack>
        <Cells gameBoard={gameBoard} disableCursor />
      </Stack>
    </Container>
  );
};

export default Board;
