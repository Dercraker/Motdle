import { create } from "zustand";

type GameStore = {
  gameBoard: string[][];
  currentRow: number;
  currentCol: number;
  isFullLine: boolean;
  AddKey: (key: string) => void;
  RemoveKey: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
  gameBoard: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],

  currentRow: 0,
  currentCol: 0,
  isFullLine: false,

  AddKey: (key) =>
    set((state) => {
      if (state.isFullLine) return state;

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
      if (state.currentCol === 0) return state;

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
}));
