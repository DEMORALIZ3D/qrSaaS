// zustand state that allow me to set the header height, ill need to set and read the headerHeight
import { create } from "zustand";

interface HeaderState {
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
}

export const useHeaderState = create<HeaderState>((set) => ({
  headerHeight: 0,
  setHeaderHeight: (height) => set({ headerHeight: height }),
}));
