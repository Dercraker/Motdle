import { z } from "zod";

export const CreateNewGameSchema = z.object({
  userId: z.string(),
});

export type CreateNewGameType = z.infer<typeof CreateNewGameSchema>;
