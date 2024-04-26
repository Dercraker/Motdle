import { z } from "zod";

export const LoginCredentialsFormScheme = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .refine(
        (value: string) => /[0-9]/.test(value),
        "Password must contain at least one digit",
      ),
    verifyPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "Password does't match",
    path: ["verifyPassword"],
  });

export type LoginCredentialsFormType = z.infer<
  typeof LoginCredentialsFormScheme
>;
