import { z } from "zod";
import { GameStatusSchema } from "../Motdle/GameStatus.schema";

export const EndGameSchema = GameStatusSchema;

export type EndGameType = z.infer<typeof EndGameSchema>;
