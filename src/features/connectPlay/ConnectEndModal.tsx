import ConfettiComponent from "@/components/ui/ConfettiComponent";
import {
  GameStatusSchema,
  GameStatusType,
} from "@/lib/zod/Motdle/GameStatus.schema";
import { LineType } from "@/lib/zod/Motdle/Line.schema";
import useConnectGameStore from "@/lib/zustand/ConnectGame.store";
import { Button, Group, Modal, Stack, Title } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import ScoreSharing from "../motdle/ScoreSharing";

interface EndModalProps {
  isOpened: boolean;
  gameStatus: GameStatusType;
  closeModal: () => void;
  slug: string;
  gameBoard: LineType[];
}
const ConnectEndModal = (props: EndModalProps) => {
  const dayCount = useConnectGameStore((state) => state.dayCount);

  return (
    <>
      <Modal.Root opened={props.isOpened} onClose={props.closeModal} centered>
        <Modal.Overlay backgroundOpacity={0.55} blur={3} />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>
              <Title order={1}>Fin de la partie !</Title>
            </Modal.Title>
            <Modal.CloseButton icon={<IconX />} />
          </Modal.Header>
          <Modal.Body>
            <Stack>
              <ScoreSharing
                isWin={props.gameStatus === GameStatusSchema.enum.win}
                gameBoard={props.gameBoard}
                slug={props.slug}
                href="/connectplay"
                hideWord
                dayCount={dayCount}
              />
              <Group align="center" justify="end">
                <Button variant="outline" component="a" href="/">
                  Revenir à l’accueil
                </Button>
              </Group>
            </Stack>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      {props.gameStatus === GameStatusSchema.enum.win && <ConfettiComponent />}
    </>
  );
};

export default ConnectEndModal;
