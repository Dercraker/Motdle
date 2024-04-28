import { z } from "zod";

export const GameStatusSchema = z.enum(["playing", "win", "lose"]);
export type GameStatusType = z.infer<typeof GameStatusSchema>;
