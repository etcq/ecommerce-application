import { create } from 'zustand';
interface HeaderState {
  isLoginMenuOpened: boolean;
  isDarkTheme: boolean;
  toggleLoginMenuOpened: () => void;
  toggleTheme: () => void;
}

export const useHeaderState = create<HeaderState>((set) => ({
  isLoginMenuOpened: false,
  isDarkTheme: false,
  toggleLoginMenuOpened: () => set((state) => ({ isLoginMenuOpened: !state.isLoginMenuOpened })),
  toggleTheme: () => set((state) => ({ isDarkTheme: !state.isDarkTheme })),
}));
