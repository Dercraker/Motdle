"use client";

import useNotify, { NotifyDto } from "@/hooks/useNotify";
import { Menu, rem } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export const LogoutButton = () => {
  const { ErrorNotify } = useNotify();

  const logoutMutation = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      redirect("/");
    },
    onError: (error) => {
      ErrorNotify({
        title: "Error",
        message: error.message,
      } as NotifyDto);
    },
  });

  return (
    <Menu.Item
      leftSection={
        <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      }
      onClick={() => logoutMutation.mutateAsync()}
    >
      Logout
    </Menu.Item>
  );
};
