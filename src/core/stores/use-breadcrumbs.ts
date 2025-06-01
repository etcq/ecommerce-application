import { create } from 'zustand';
import { IBreadcrumbItem } from '@/interfaces/interfaces.ts';

interface IBreadcrumbState {
  breadcrumb: IBreadcrumbItem[];
  setBreadcrumb: (path: IBreadcrumbItem[]) => void;
  addToBreadcrumb: (item: IBreadcrumbItem) => void;
  removeFromBreadcrumb: (itemId: string) => void;
  resetBreadcrumb: () => void;
}

export const useBreadcrumbStore = create<IBreadcrumbState>((set) => ({
  breadcrumb: [],
  setBreadcrumb: (path: IBreadcrumbItem[]): void => set({ breadcrumb: path }),
  addToBreadcrumb: (item: IBreadcrumbItem): void =>
    set((state: IBreadcrumbState) => {
      if (!state.breadcrumb.some((crumb: IBreadcrumbItem): boolean => crumb.id === item.id)) {
        return { breadcrumb: [...state.breadcrumb, item] };
      }
      return state;
    }),
  removeFromBreadcrumb: (itemId: string): void =>
    set((state: IBreadcrumbState) => ({
      breadcrumb: state.breadcrumb.filter((item: IBreadcrumbItem): boolean => item.id !== itemId),
    })),
  resetBreadcrumb: (): void => set({ breadcrumb: [] }),
}));
