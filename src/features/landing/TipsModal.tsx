"use client";

import { LogoSvgWhite } from "@/components/svg/LogoSvgWhite";
import useCookie from "@/hooks/useCookie";
import { Button, Checkbox, Group, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlayerPlay, IconX } from "@tabler/icons-react";

export const TipsModal = () => {
  const { GetCookie, SaveCookieWithExpireTime, DeleteCookie } = useCookie();

  const tipsCookie: boolean = Boolean(GetCookie("Tips"));
  const [opened, { close: closeModal }] = useDisclosure(!tipsCookie);

  return (
    <Modal.Root opened={opened} onClose={closeModal} centered size="xl">
      <Modal.Overlay backgroundOpacity={0.55} blur={3} />
      <Modal.Content>
        <Modal.Body>
          <Stack>
            <Group align="center" justify="end">
              <LogoSvgWhite size={48} />
              <Title>French Wordle Game</Title>
              <Modal.CloseButton icon={<IconX />} />
            </Group>

            <Checkbox
              checked={tipsCookie}
              label="Ne plus afficher"
              variant="outline"
              onClick={(evn) =>
                evn.currentTarget.checked
                  ? SaveCookieWithExpireTime("Tips", `true`, 90)
                  : DeleteCookie("Tips")
              }
            />
            <Button leftSection={<IconPlayerPlay />} onClick={closeModal}>
              Commencer à jouer !
            </Button>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
