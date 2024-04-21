import useNotify from "@/hooks/useNotify";
import { GameStore } from "@/types/gameStore";
import { ValidationResult } from "@/types/validationResult";
import { WORDS } from "@/words";
import { create } from "zustand";

export const useGameStore = create<GameStore>((set) => ({
  currentWord: WORDS[Math.floor(Math.random() * WORDS.length)]
    .toUpperCase()
    .split(""),

  validationResult: [] as ValidationResult[],

  gameBoard: [
    ["_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_"],
  ],

  currentRow: 0,
  currentCol: 0,
  isFullLine: false,
  isEndGame: false,

  AddKey: (key) =>
    set((state) => {
      if (state.isFullLine || state.isEndGame) return state;

      const { currentRow, currentCol } = state;

      const updatedGameBoard = [...state.gameBoard];
      updatedGameBoard[currentRow][currentCol] = key;

      const newCol = currentCol < 4 ? currentCol + 1 : currentCol;
      const isFull = currentCol === 4;

      return {
        gameBoard: updatedGameBoard,
        currentCol: newCol,
        isFullLine: isFull,
      };
    }),

  RemoveKey: () => {
    set((state) => {
      if (state.currentCol === 0 || state.isEndGame) return state;

      const updatedGameBoard = [...state.gameBoard];
      if (state.isFullLine)
        updatedGameBoard[state.currentRow][state.currentCol] = "_";
      else updatedGameBoard[state.currentRow][state.currentCol - 1] = "_";

      const newCurrentCol = state.isFullLine
        ? state.currentCol
        : state.currentCol > 0
          ? state.currentCol - 1
          : 0;

      return {
        gameBoard: updatedGameBoard,
        currentCol: newCurrentCol,
        isFullLine: false,
      };
    });
  },

  ValidateWord: () => {
    const { SuccessNotify } = useNotify();
    let result: ValidationResult[] = [];
    set((state) => {
      let { isEndGame } = state;

      if (isEndGame) return state;

      const word = state.gameBoard[state.currentRow];

      result = word.map((currentChar, i) => {
        if (currentChar === state.currentWord[i])
          return { state: 1, char: currentChar };
        if (state.currentWord.includes(currentChar))
          return { state: 0, char: currentChar };
        return { state: -1, char: currentChar };
      });

      if (result.every((validation) => validation.state === 1)) {
        isEndGame = true;
        SuccessNotify({
          title: "Tu as gagner !",
          message: "Félicitation ! 🎉🎉🎉",
        });
      }

      return {
        currentCol: 0,
        validationResult: result,
        currentRow:
          state.currentRow < 6 ? state.currentRow + 1 : state.currentRow,
        isFullLine: false,
        isEndGame: isEndGame || state.currentRow + 1 === 6,
      };
    });
  },
}));
