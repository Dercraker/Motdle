import { getServerUrl } from "@/lib/server-url";
import { Button } from "@mantine/core";
import { IconBrandDiscord, IconBrandGithub } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

type ProviderButtonProps = {
  providerId: string;
};

export const ProviderButton = (props: ProviderButtonProps) => {
  const searchParams = useSearchParams();

  const oAuthSignInMutation = useMutation({
    mutationFn: () =>
      signIn(props.providerId, {
        callbackUrl: searchParams.get("callbackUrl") ?? `${getServerUrl()}/`,
      }),
  });

  return (
    <>
      {props.providerId === "discord" && (
        <Button
          fullWidth
          leftSection={<IconBrandDiscord />}
          my="xs"
          onClick={() => oAuthSignInMutation.mutate()}
        >
          Sign in with Discord
        </Button>
      )}
      {props.providerId === "github" && (
        <Button
          fullWidth
          leftSection={<IconBrandGithub />}
          my="xs"
          onClick={() => oAuthSignInMutation.mutate()}
        >
          Sign in with Github
        </Button>
      )}
    </>
    // <Button
    //   className="border-gray-500 bg-black text-white hover:bg-gray-950"
    //   size="lg"
    //   onClick={() => {
    //     githubSignInMutation.mutate();
    //   }}
    // >
    //   {githubSignInMutation.isPending ? <Loader size={16} /> : data.icon}
    //   <span className="ml-2 text-base">Sign in with {data.name}</span>
    // </Button>
  );
};
