"use client";

import { getServerUrl } from "@/lib/server-url";
import { Button, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "mantine-form-zod-resolver";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const MagicLinkForm = () => {
  const magicLinkForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
    },
    validate: zodResolver(FormSchema),
  });

  const searchParams = useSearchParams();
  const emailSignInMutation = useMutation({
    mutationFn: async (email: string) => {
      await signIn("resend", {
        callbackUrl: searchParams.get("callbackUrl") ?? `${getServerUrl()}/`,
        redirect: true,
        email,
      });
    },
  });

  const handleSubmitForm = async () => {
    await emailSignInMutation.mutateAsync(magicLinkForm.values.email);
  };

  const handleResetForm = () => {
    magicLinkForm.reset();
  };
  return (
    <form onSubmit={handleSubmitForm} onReset={handleResetForm}>
      <Stack>
        <Text fw="600">Magic link ✨</Text>
        <TextInput
          placeholder="Email"
          {...magicLinkForm.getInputProps("email")}
        />
        <Button
          disabled={!magicLinkForm.isValid() || emailSignInMutation.isPending}
        >
          Sign in
        </Button>
      </Stack>
    </form>
  );
};
