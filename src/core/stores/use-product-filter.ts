import { create } from 'zustand';
import { IPriceRange, TSortOrder } from '@/interfaces/interfaces.ts';

interface IFilterState {
  priceRanges: IPriceRange[];
  setPriceRanges: (ranges: IPriceRange[]) => void;
  togglePriceRange: (range: IPriceRange) => void;
  sortBrands: string[];
  setSortBrand: (brandId: string[]) => void;
  toggleSortBrand: (brandId: string) => void;
  sortOrder: TSortOrder;
  setSortOrder: (order: TSortOrder) => void;
  alphabetically: boolean;
  setAlphabetically: (alphabetically: boolean) => void;
  setDefault: () => void;
}

export const useProductFilterStore = create<IFilterState>((set, get) => ({
  priceRanges: [],
  setPriceRanges: (ranges: IPriceRange[]): void => set({ priceRanges: ranges }),
  togglePriceRange: (selectedRange: IPriceRange): void => {
    const currentRange: IPriceRange[] = get().priceRanges;
    const existsRange: boolean = currentRange.some(
      (range: IPriceRange): boolean => range?.min === selectedRange?.min && range?.max === selectedRange?.max,
    );
    if (existsRange) {
      set({
        priceRanges: currentRange.filter(
          (range: IPriceRange): boolean => !(range?.min === selectedRange?.min && range?.max === selectedRange?.max),
        ),
      });
    } else {
      set({ priceRanges: [...currentRange, selectedRange] });
    }
  },
  sortBrands: [],
  setSortBrand: (brandId: string[]): void => set({ sortBrands: brandId }),
  toggleSortBrand: (brandId) => {
    const current = get().sortBrands;
    const exists = current.includes(brandId);
    set({
      sortBrands: exists ? current.filter((id) => id !== brandId) : [...current, brandId],
    });
  },
  sortOrder: null,
  setSortOrder: (order: TSortOrder): void => set({ sortOrder: order, alphabetically: false }),
  alphabetically: false,
  setAlphabetically: (alphabetically: boolean): void => set({ alphabetically: alphabetically, sortOrder: null }),
  setDefault: (): void => set({ priceRanges: [], alphabetically: false, sortOrder: null, sortBrands: [] }),
}));
