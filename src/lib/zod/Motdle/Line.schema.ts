import { z } from "zod";
import { CharacterSchema } from "./Character.schema";

export const LineSchema = z.array(CharacterSchema);

export type LineType = z.infer<typeof LineSchema>;
