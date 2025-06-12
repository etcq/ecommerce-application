import { create } from 'zustand';
import { Category, ProductProjection } from '@commercetools/platform-sdk';

interface ICategoryNavigationState {
  allCategories: Category[];
  activeRootCategoryId: string | null;
  selectedFootwearCategoryId: string | null;
  selectedBrandCategoryId: string | null;
  footwearCategories: Category[];
  brandCategories: Category[];
  productsInCategory: ProductProjection[];
  redirectInToMainPage: string;
  setAllCategories: (allCategories: Category[]) => void;
  setActiveRootCategoryId: (id: string | null) => void;
  setSelectedFootwearId: (id: string | null) => void;
  setSelectedBrandCategoryId: (id: string | null) => void;
  setFootwearCategories: (categories: Category[]) => void;
  setBrandCategories: (categories: Category[]) => void;
  setProductsInCategory: (products: ProductProjection[] | undefined) => void;
  setRedirectInToMainPage: (redirectInToMainPage: string) => void;
  setReset: () => void;
}

export const useCategoryNavigationStore = create<ICategoryNavigationState>((set) => ({
  allCategories: [],
  activeRootCategoryId: null,
  selectedFootwearCategoryId: null,
  selectedBrandCategoryId: null,
  footwearCategories: [],
  brandCategories: [],
  productsInCategory: [],
  redirectInToMainPage: '',
  setAllCategories: (categories: Category[]): void => set({ allCategories: categories }),
  setActiveRootCategoryId: (id: string | null): void =>
    set({ activeRootCategoryId: id, selectedFootwearCategoryId: null, brandCategories: [] }),
  setSelectedFootwearId: (id: string | null): void => set({ selectedFootwearCategoryId: id }),
  setSelectedBrandCategoryId: (id: string | null): void => set({ selectedBrandCategoryId: id }),
  setFootwearCategories: (categories: Category[]): void => set({ footwearCategories: categories }),
  setBrandCategories: (categories: Category[]): void => set({ brandCategories: categories }),
  setProductsInCategory: (products: ProductProjection[] | undefined): void => set({ productsInCategory: products }),
  setRedirectInToMainPage: (name: string) => set({ redirectInToMainPage: name }),
  setReset: (): void =>
    set({
      activeRootCategoryId: null,
      selectedFootwearCategoryId: null,
      footwearCategories: [],
      brandCategories: [],
      productsInCategory: [],
    }),
}));
