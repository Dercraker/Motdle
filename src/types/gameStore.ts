import { ValidationResult } from "./validationResult";

export type GameStore = {
  currentWord: string[];
  validationResult: ValidationResult[];
  gameBoard: string[][];
  currentRow: number;
  currentCol: number;
  isFullLine: boolean;
  isEndGame: boolean;

  AddKey: (key: string) => void;
  RemoveKey: () => void;

  ValidateWord: () => void;
};
