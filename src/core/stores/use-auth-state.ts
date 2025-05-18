import { create, UseBoundStore, StoreApi } from 'zustand';
import { tokenCache, useTokenCacheStore } from '@/core/api/token/token-store.ts';
import { ITokenCacheState } from '@/interfaces/interfaces.ts';
import { loginCustomers } from '@/core/api/customers/login.ts';
import { ByProjectKeyRequestBuilder, CustomerSignInResult } from '@commercetools/platform-sdk';
import { withRefreshTokenFlow } from '@/core/api/middlewere/refresh-token-flow.ts';
import { ClientResponse } from '@commercetools/ts-client';
import { Customer } from '@commercetools/platform-sdk';

interface IAuthState {
  isLoggedIn: boolean;
  customer: CustomerSignInResult['customer'] | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initializationAuth: () => void;
}

export const useAuthStore: UseBoundStore<StoreApi<IAuthState>> = create<IAuthState>((set) => ({
  isLoggedIn: false,
  customer: null,

  login: async (email: string, password: string): Promise<void> => {
    const response: CustomerSignInResult | null = await loginCustomers(email, password);
    if (response?.customer) {
      set({
        isLoggedIn: true,
        customer: response.customer,
      });
    }
  },

  logout: (): void => {
    tokenCache.clear();
    set({
      isLoggedIn: false,
      customer: null,
    });
  },

  initializationAuth: (): void => {
    void (async (): Promise<void> => {
      const tokenData: ITokenCacheState = useTokenCacheStore.getState();
      if (tokenData.token && !tokenCache.isTokenExpired()) {
        try {
          if (tokenData.refreshToken != null) {
            const client: ByProjectKeyRequestBuilder = withRefreshTokenFlow(tokenData.refreshToken);
            const response: ClientResponse<Customer> = await client.me().get().execute();
            set({
              isLoggedIn: true,
              customer: response.body,
            });
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          tokenCache.clear();
          set({
            isLoggedIn: false,
            customer: null,
          });
        }
      }
    })();
  },
}));
