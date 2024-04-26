import { create } from "zustand";

export interface FreePlayStore {
  wantedWordId: string | null;
  wantedWord: string | null;
}

export const useFreePlayStore = create<FreePlayStore>((set) => ({
  wantedWordId: null,
  wantedWord: null,
}));
