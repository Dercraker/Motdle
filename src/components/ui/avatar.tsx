import { Avatar } from "@mantine/core";
import { User } from "next-auth";

interface AvatarProps {
  user: User;
}
export const AvatarImage = (props: AvatarProps) => {
  return props.user.image ? (
    <Avatar src={props.user.image} alt={props.user.name ?? "User Avatar"} />
  ) : props.user.email ? (
    <Avatar color="cyan" radius="xl">
      {props.user.email.slice(0, 2)}
    </Avatar>
  ) : (
    <Avatar color="cyan" radius="xl" />
  );
};
