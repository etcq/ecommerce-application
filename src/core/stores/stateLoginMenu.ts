import { create } from 'zustand';

interface LoginState {
  isOpen: boolean;
  toggleStatus: () => void;
}

export const useLoginMenu = create<LoginState>((set) => ({
  isOpen: false,
  toggleStatus: () => set((state) => ({ isOpen: !state.isOpen })),
}));
