import { create } from 'zustand';

interface LoginState {
  isOpen: boolean;
  isLogged: boolean;
  toggleStatus: () => void;
}

export const useLoginMenu = create<LoginState>((set) => ({
  isOpen: false,
  isLogged: true,
  toggleStatus: () => set((state) => ({ isOpen: !state.isOpen })),
}));
