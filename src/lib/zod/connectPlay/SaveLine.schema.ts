import { z } from "zod";
import { LineSchema } from "../Motdle/Line.schema";

export const SaveLineSchema = z.object({
  row: LineSchema,
  partyId: z.string(),
});

export type SaveLineType = z.infer<typeof SaveLineSchema>;
