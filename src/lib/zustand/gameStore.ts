import { create } from "zustand";

type GameStore = {
  currentBoard: string[][];
  currentRow: number;
  currentCol: number;
  isFullLine: boolean;
  AddKey: (key: string) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  currentBoard: [
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
    set((state) => ({
      currentBoard: state.currentBoard.map((row, rowIdx) => {
        if (rowIdx === state.currentRow) {
          return row.map((col, colIdx) => {
            if (colIdx === state.currentCol) {
              return key;
            }
            return col;
          });
        }
        return row;
      }),
      currentRow:
        state.currentCol === 4 ? state.currentRow + 1 : state.currentRow,
      currentCol: state.currentCol === 4 ? 0 : state.currentCol + 1,
      isFullLine: state.currentCol === 4,
    })),
}));
