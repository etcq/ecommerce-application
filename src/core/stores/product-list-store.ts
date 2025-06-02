import { create } from 'zustand';

interface IProductListState {
  page: number;
  total: number | null;
  isLastPage: boolean;
  incPage: () => void;
  decPage: () => void;
  setPage: (number: number) => void;
  setTotal: (number: number) => void;
  setIsLastPage: (status: boolean) => void;
  resetList: () => void;
}

export const useProductListStore = create<IProductListState>((set) => ({
  page: 1,
  total: null,
  isLastPage: false,
  incPage: () =>
    set((state) => {
      if (!state.isLastPage) {
        return { page: state.page + 1 };
      }
      return state;
    }),
  decPage: () =>
    set((state) => {
      if (state.page !== 1) {
        return { page: state.page - 1 };
      }
      return state;
    }),
  setPage: (number: number) => set(() => ({ page: number })),
  setTotal: (number: number) => set(() => ({ total: number })),
  setIsLastPage: (status: boolean) => set(() => ({ isLastPage: status })),
  resetList: () => set(() => ({ page: 1, total: 0 })),
}));
