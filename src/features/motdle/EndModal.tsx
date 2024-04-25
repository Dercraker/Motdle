import { GameStatusType } from "@/lib/zod/Motdle/GameStatus.schema";
import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";

interface EndModalProps {
  isGameFinished?: boolean;
  gameStatus?: GameStatusType;
}
const EndModal = ({ isGameFinished }: EndModalProps) => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ isGameFinished:", isGameFinished);
    if (isGameFinished) setOpened(true);
    setOpened(false);
  }, [isGameFinished]);

  return (
    <>
      <Modal.Root opened={opened} onClose={() => setOpened(false)}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>Modal content</Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default EndModal;
