import type {TokenStore} from "@commercetools/sdk-client-v2";

export interface ITokenCacheState extends TokenStore {
  setTokenData: (newTokenData: TokenStore) => void;
  clearTokenData: () => void;
}