import { AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";
import { UserDropDown } from "./UserDropDown";

interface LoggedInButtonProps {
  user: User;
}
export const LoggedInButton = (props: LoggedInButtonProps) => {
  return (
    <UserDropDown user={props.user}>
      <AvatarImage user={props.user} />
    </UserDropDown>
  );
};
