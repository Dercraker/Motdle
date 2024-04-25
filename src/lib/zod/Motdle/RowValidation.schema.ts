import { z } from "zod";
import { LineSchema } from "./Line.schema";

export const RowValidationSchema = z.object({
  row: LineSchema,
  slug: z.string(),
});

export type RowValidationType = z.infer<typeof RowValidationSchema>;
