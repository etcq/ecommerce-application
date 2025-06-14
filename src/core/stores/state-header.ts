import { create } from 'zustand';
interface HeaderState {
  isLoginMenuOpened: boolean;
  isDarkTheme: boolean;
  toggleLoginMenuOpened: () => void;
  setIsDarkTheme: (active: boolean) => void;
}

export const useHeaderState = create<HeaderState>((set) => ({
  isLoginMenuOpened: false,
  isDarkTheme: false,
  toggleLoginMenuOpened: () => set((state) => ({ isLoginMenuOpened: !state.isLoginMenuOpened })),
  setIsDarkTheme: (active: boolean) => set(() => ({ isDarkTheme: active })),
}));
