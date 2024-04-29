import { create } from "zustand";

export interface ConnectGameStore {
  dayCount: number;
  SetDayCount: (dayCount: number) => void;
}

const useConnectGameStore = create<ConnectGameStore>()((set) => ({
  dayCount: 0,
  SetDayCount: (dayCount) => set({ dayCount }),
}));

export default useConnectGameStore;
