import type { TokenStore } from '@commercetools/sdk-client-v2';

export interface ITokenCacheState extends TokenStore {
  setTokenData: (newTokenData: TokenStore) => void;
  clearTokenData: () => void;
}

export interface IProductInfoForCard {
  id: string;
  name: string;
  description: string | undefined;
  img?: string;
  prices: { main: number; discount?: number };
}

export interface IProductInfoForDetailedPage extends IProductInfoForCard {
  images: string[];
  sizes: number[];
  colors: string[];
}

export interface IPriceRange {
  min: number;
  max: number;
}

export type TSortOrder = 'ascending' | 'descending' | null;

export interface IBreadcrumbItem {
  id: string;
  name: string;
}
