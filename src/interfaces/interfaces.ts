import type { TokenStore } from '@commercetools/sdk-client-v2';
import { ROUTES } from '@/constants/constants.ts';
import { ProductVariant } from '@commercetools/platform-sdk';

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
  productInfo: IProductInfoForDetailedPage;
}

export interface IProductInfoForDetailedPage extends IProductInfoForCard {
  images: string[];
  sizes: number[];
  colors: string[];
  variants: ProductVariant[];
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

export interface IDiscountInfo {
  name: string;
  description: string;
  isActive: boolean;
  code: string;
}

export interface IMenuLinks {
  route: ROUTES | string;
  caption: string;
}

export interface IProductParams {
  cartId: string;
  version: number;
  productId: string;
  variantId: number;
  userToken?: string | null;
}

export interface ICategoryRedirectState {
  redirectCategory?: string;
}
