import { create } from 'zustand';

interface IToastState {
    message: string | null;
    setMessage: (msg: string) => void;
    clearMessage: () => void;
}

export const useToastStore = create<IToastState>((set) => ({
    message: null,
    setMessage: (msg: string): void => set({ message: msg }),
    clearMessage: (): void => set({ message: null }),
}));