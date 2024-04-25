import { z } from "zod";

export const CharacterStateSchema = z.enum([
  "idle",
  "correct",
  "present",
  "absent",
]);

export type CharacterStateType = z.infer<typeof CharacterStateSchema>;
