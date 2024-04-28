import ConfettiComponent from "@/components/ui/ConfettiComponent";
import {
  GameStatusSchema,
  GameStatusType,
} from "@/lib/zod/Motdle/GameStatus.schema";
import { LineType } from "@/lib/zod/Motdle/Line.schema";
import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core";
import ScoreSharing from "../motdle/ScoreSharing";

interface EndModalProps {
  isGameEnd: boolean;
  gameStatus: GameStatusType;
  gameBoard: LineType[];
  slug: string;
  restartNewGame: () => void;
}
const EndModal = ({
  isGameEnd,
  gameStatus,
  restartNewGame,
  gameBoard,
  slug,
}: EndModalProps) => {
  return (
    <>
      <Modal.Root opened={isGameEnd} onClose={() => {}} centered>
        <Modal.Overlay backgroundOpacity={0.55} blur={3} />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>
              <Title>Fin de la partie !</Title>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stack>
              {gameStatus === GameStatusSchema.enum.win ? (
                <>
                  <Text>Bravo tu à trouver le mot.</Text>
                </>
              ) : (
                <Text>Dommage, tu as perdu.</Text>
              )}
              <ScoreSharing
                isWin={gameStatus === GameStatusSchema.enum.win}
                gameBoard={gameBoard}
                slug={slug}
              />
              <Group align="center" justify="end">
                <Button onClick={restartNewGame}>Rejouer</Button>
                <Button variant="outline" component="a" href="/">
                  Revenir à l’accueil
                </Button>
              </Group>
            </Stack>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      {gameStatus === GameStatusSchema.enum.win && <ConfettiComponent />}
    </>
  );
};

export default EndModal;
