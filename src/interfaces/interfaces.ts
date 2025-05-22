import type { TokenStore } from '@commercetools/sdk-client-v2';

export interface ITokenCacheState extends TokenStore {
  setTokenData: (newTokenData: TokenStore) => void;
  clearTokenData: () => void;
}

export interface IProductInfoForCard {
  id: string;
  name: string;
  img?: string;
  prices: { main: number; discount?: number };
}
