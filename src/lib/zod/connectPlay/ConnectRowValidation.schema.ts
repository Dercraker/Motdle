import { z } from "zod";
import { LineSchema } from "../Motdle/Line.schema";

export const ConnectRowValidationSchema = z.object({
  row: LineSchema,
  slug: z.string(),
  party: z.string(),
});

export type ConnectRowValidationType = z.infer<
  typeof ConnectRowValidationSchema
>;
