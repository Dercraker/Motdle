import {
  GameStatusSchema,
  GameStatusType,
} from "@/lib/zod/Motdle/GameStatus.schema";
import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

interface EndModalProps {
  isOpened: boolean;
  gameStatus: GameStatusType;
  closeModal: () => void;
}
const ConnectEndModal = ({
  isOpened,
  gameStatus,
  closeModal,
}: EndModalProps) => {
  return (
    <>
      <Modal.Root opened={isOpened} onClose={closeModal} centered>
        <Modal.Overlay backgroundOpacity={0.55} blur={3} />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Fin de la partie !</Modal.Title>
            <Modal.CloseButton icon={<IconX />} />
          </Modal.Header>
          <Modal.Body>
            <Stack>
              {gameStatus === GameStatusSchema.enum.win ? (
                <Text>Bravo tu à trouver le mot.</Text>
              ) : (
                <Text>Dommage, tu as perdu.</Text>
              )}
              <Group align="center" justify="end">
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

export default ConnectEndModal;
