import { z } from "zod";

export const GetPartyOfTheDaySchema = z.null();

export type GetPartyOfTheDayType = z.infer<typeof GetPartyOfTheDaySchema>;
