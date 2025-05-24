import { create } from 'zustand';

interface IProductListState {
  page: number;
  total: number | null;
  isProductEnded: boolean;
  incPage: () => void;
  decPage: () => void;
  setPage: (number: number) => void;
  setTotal: (number: number) => void;
  setIsProductEnded: (status: boolean) => void;
}

export const useProductListStore = create<IProductListState>((set) => ({
  page: 1,
  total: null,
  isProductEnded: false,
  incPage: () => set((state) => ({ page: state.page + 1 })),
  decPage: () => set((state) => ({ page: state.page - 1 })),
  setPage: (number: number) => set(() => ({ page: number })),
  setTotal: (number: number) => set(() => ({ total: number })),
  setIsProductEnded: (status: boolean) => set(() => ({ isProductEnded: status })),
}));
