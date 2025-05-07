import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
import { LocalStorageKeys} from "@/core/constants";
import {ITokenCacheState} from "@/interfaces/interfaces.ts";

export const useTokenCacheStore = create<ITokenCacheState>()(
  persist(
    (set) => ({
      token: '',
      refreshToken: '',
      expirationTime: 0,
      setTokenData: (newTokenData: TokenStore): void => set(newTokenData),
      clearTokenData: (): void => set({ token: '', refreshToken: '', expirationTime: 0 }),
    }),
    {
      name: LocalStorageKeys.TOKEN,
      storage: createJSONStorage((): Storage => localStorage),
    },
  ),
);

export const tokenCache: TokenCache & {
  clear: () => void;
  isTokenExpired: () => boolean;
} = {
  get: () => {
    const state: ITokenCacheState = useTokenCacheStore.getState();
    return {
      token: state.token,
      refreshToken: state.refreshToken,
      expirationTime: state.expirationTime,
    };
  },
  set: (data: TokenStore): void => {
    useTokenCacheStore.getState().setTokenData(data);
  },
  clear: (): void => {
    useTokenCacheStore.getState().clearTokenData();
  },
  isTokenExpired: (): boolean => {
    const { expirationTime } = useTokenCacheStore.getState();
    return expirationTime !== 0 && expirationTime <= Date.now();
  },
};
