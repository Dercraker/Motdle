import { z } from "zod";
import { CharacterStateSchema } from "./CharacterState.schema";
export const CharacterSchema = z.object({
  state: CharacterStateSchema,
  character: z.string(),
});

export type CharacterType = z.infer<typeof CharacterSchema>;
