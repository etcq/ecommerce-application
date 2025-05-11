import { create } from 'zustand';

interface HeaderState {
  isOpen: boolean;
  isLogged: boolean;
  isDarkTheme: boolean;
  toggleStatus: () => void;
}

export const useHeaderState = create<HeaderState>((set) => ({
  isOpen: false,
  isLogged: false,
  isDarkTheme: false,
  toggleStatus: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleTheme: () => set((state) => ({ isDarkTheme: !state.isDarkTheme })),
}));
