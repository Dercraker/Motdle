import { z } from "zod";

export const GetWordWithSlugSchema = z.string();
export type GetWordWithSlugType = z.infer<typeof GetWordWithSlugSchema>;
