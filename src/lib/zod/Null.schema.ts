import { z } from "zod";

export const NullSchema = z.null();

export type NullSchemaType = z.infer<typeof NullSchema>;
