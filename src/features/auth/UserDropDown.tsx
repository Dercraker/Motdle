import { AvatarImage } from "@/components/ui/avatar";
import {
  ActionIcon,
  Group,
  Menu,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronRight, IconSettings } from "@tabler/icons-react";
import { User } from "next-auth";
import { ReactNode } from "react";
import { LogoutButton } from "./LogoutButton";

interface UserDropDownProps {
  user: User;
  children: ReactNode;
}

export const UserDropDown = (props: UserDropDownProps) => {
  const theme = useMantineTheme();
  return (
    <Group justify="center">
      <Menu
        withArrow
        width={300}
        position="bottom-end"
        transitionProps={{ transition: "pop" }}
        withinPortal
      >
        <Menu.Target>
          <ActionIcon variant="transparent" radius="xl" size="xl">
            {props.children}
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            rightSection={
              <IconChevronRight
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            component="a"
            href="/account"
          >
            <Group>
              <AvatarImage user={props.user} />
              <div>
                <Text fw={500}>{props.user.name}</Text>
                <Text size="xs" c="dimmed">
                  {props.user.email}
                </Text>
              </div>
            </Group>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Application</Menu.Label>
          {/* <Menu.Item
            leftSection={
              <IconStar
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.yellow[6]}
              />
            }
          >
            Favorite characters
          </Menu.Item> */}

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            leftSection={
              <IconSettings
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            component="a"
            href="/account"
          >
            Account settings
          </Menu.Item>
          <LogoutButton />
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
