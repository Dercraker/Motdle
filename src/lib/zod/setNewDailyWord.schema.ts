import { z } from "zod";

export const SetNewDailyWordScheme = z.null();

export type SetNewDailyWordType = z.infer<typeof SetNewDailyWordScheme>;
