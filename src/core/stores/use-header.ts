import { create } from 'zustand';
interface IHeaderState {
  isLoginMenuOpened: boolean;
  isDarkTheme: boolean;
  toggleLoginMenuOpened: () => void;
  setIsDarkTheme: (active: boolean) => void;
}

export const useHeaderStore = create<IHeaderState>((set) => ({
  isLoginMenuOpened: false,
  isDarkTheme: false,
  toggleLoginMenuOpened: () => set((state) => ({ isLoginMenuOpened: !state.isLoginMenuOpened })),
  setIsDarkTheme: (active: boolean) => set(() => ({ isDarkTheme: active })),
}));
