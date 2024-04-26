import {
  GameStatusSchema,
  GameStatusType,
} from "@/lib/zod/Motdle/GameStatus.schema";
import { Button, Group, Modal, Stack, Text } from "@mantine/core";

interface EndModalProps {
  isGameEnd: boolean;
  gameStatus: GameStatusType;
  restartNewGame: () => void;
}
const EndModal = ({ isGameEnd, gameStatus, restartNewGame }: EndModalProps) => {
  return (
    <>
      <Modal.Root opened={isGameEnd} onClose={() => {}} centered>
        <Modal.Overlay backgroundOpacity={0.55} blur={3} />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stack>
              {gameStatus === GameStatusSchema.enum.win ? (
                <Text>Bravo tu à trouver le mot.</Text>
              ) : (
                <Text>Dommage, tu as perdu.</Text>
              )}
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
    </>
  );
};

export default EndModal;
