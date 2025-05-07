import { tokenCache } from '@/core/api/token/token-store.tsx';
import { withPasswordFlow} from "@/core/api/middlewere/password-flow.ts";
import { withRefreshTokenFlow} from "@/core/api/middlewere/refresh-token-flow.tsx";
import {CartSignInModeEnum, LocalStorageKeys} from "@/core/constants";
import { ByProjectKeyRequestBuilder, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { ClientResponse } from '@commercetools/ts-client';

export async function loginCustomers(email: string, password: string): Promise<Customer | null > {
  try {
    const anonymousCartId: string | null = localStorage.getItem(LocalStorageKeys.ANONYMOUSCARTID);
    const refreshToken: string | undefined = tokenCache.get().refreshToken;

    if (anonymousCartId && refreshToken) {
      const refreshTokenClient: ByProjectKeyRequestBuilder = await withRefreshTokenFlow(refreshToken);
      await refreshTokenClient
        .me()
        .login()
        .post({
          body: {
            email,
            password,
            activeCartSignInMode: CartSignInModeEnum.MergeWithExistingCustomerCart,
            updateProductData: true,
          },
        })
        .execute();
    }

    tokenCache.clear();

    const passwordFlowClient: ByProjectKeyRequestBuilder | null = withPasswordFlow(email, password, tokenCache);
    if (!passwordFlowClient) {
      console.error('Failed to create password flow client');
      return null;
    }
    const response: ClientResponse<CustomerSignInResult> = await passwordFlowClient
      .me()
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute();

    if (!response.body || !response.body.customer) {
      console.error('Login response is missing customer information');
      return null;
    }
    return response.body.customer;
  } catch (error) {
    console.error('Login error:', error);
    return null
  }
}
