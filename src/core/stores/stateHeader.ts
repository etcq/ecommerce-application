import { create } from 'zustand';
interface HeaderState {
  isOpen: boolean;
  isBye: boolean;
  isDarkTheme: boolean;
  toggleStatus: () => void;
  changeByeStatus: () => void;
  toggleTheme: () => void;
}

export const useHeaderState = create<HeaderState>((set) => ({
  isOpen: false,
  isBye: false,
  isDarkTheme: false,
  toggleStatus: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleTheme: () => set((state) => ({ isDarkTheme: !state.isDarkTheme })),
  changeByeStatus: () => set((state) => ({ isBye: !state.isBye })),
}));
