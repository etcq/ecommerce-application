import { create, UseBoundStore, StoreApi } from 'zustand';
import {TokenStore} from "@commercetools/sdk-client-v2";
import {useTokenCacheStore} from "@/core/api/token/token-store.tsx";
import {ITokenCacheState} from "@/interfaces/interfaces.ts";

interface IAuthState {
  isLoggedIn: boolean;
  login: (tokenData: TokenStore) => void;
  logout: () => void;
  initializationAuth: () => void,
}

export const useAuthStore: UseBoundStore<StoreApi<IAuthState>> = create<IAuthState>((set) => ({
  isLoggedIn: false,
  login: (tokenData: TokenStore): void => {
    useTokenCacheStore.getState().setTokenData(tokenData);
    set({isLoggedIn: true})
  },

  logout: (): void =>{
    useTokenCacheStore.getState().clearTokenData();
    set({ isLoggedIn: false })
  },

  initializationAuth: ():void => {
    const tokenData: ITokenCacheState = useTokenCacheStore.getState()
    if (tokenData) {
      set({isLoggedIn: true})
    }
  }
}));
