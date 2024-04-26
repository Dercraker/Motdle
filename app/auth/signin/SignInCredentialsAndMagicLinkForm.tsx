"use client";

import { Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { signIn } from "next-auth/react";
import { useQueryState } from "nuqs";
import { useLocalStorage } from "react-use";
import { z } from "zod";

const LoginCredentialsFormScheme = z.object({
  email: z.string().email(),
  password: z.string().min(8).optional(),
});

export const SignInCredentialsAndMagicLinkForm = () => {
  const loginFrom = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(LoginCredentialsFormScheme),
  });

  const [callbackUrl] = useQueryState("callbackUrl");
  const [isUsingCredentials, setIsUsingCredentials] = useLocalStorage(
    "sign-in-with-credentials",
    false,
  );

  const handleSubmitForm = async () => {
    console.log(isUsingCredentials);
    if (isUsingCredentials) {
      await signIn("credentials", {
        email: loginFrom.values.email,
        password: loginFrom.values.password,
        callbackUrl: callbackUrl ?? undefined,
      });
    } else {
      await signIn("resend", {
        email: loginFrom.values.email,
        callbackUrl: callbackUrl ?? undefined,
      });
    }
  };

  return (
    <form>
      <Stack>
        <Text fw="600">
          {isUsingCredentials
            ? "Authenticate with credentials"
            : "Magic link ✨"}
        </Text>
        <TextInput
          label={isUsingCredentials ? "Email" : null}
          withAsterisk={isUsingCredentials}
          placeholder="Email"
          {...loginFrom.getInputProps("email")}
        />
        {isUsingCredentials ? (
          <TextInput
            label="Password"
            withAsterisk
            placeholder="Password"
            {...loginFrom.getInputProps("password")}
          />
        ) : (
          <Text
            fs="italic"
            c="blue"
            style={{ cursor: "pointer" }}
            onClick={() => setIsUsingCredentials(!isUsingCredentials)}
          >
            Use password
          </Text>
        )}
        <Button onClick={handleSubmitForm}>
          {isUsingCredentials
            ? "Login with Password"
            : "Login with MagicLink ✨"}
        </Button>

        {isUsingCredentials && (
          <Group>
            <Text>
              Forgot password ?{" "}
              <Text
                fs="italic"
                c="blue"
                style={{ cursor: "pointer" }}
                onClick={() => setIsUsingCredentials(!isUsingCredentials)}
              >
                Login with MagicLink ✨
              </Text>
            </Text>
          </Group>
        )}
      </Stack>
    </form>
  );
};
