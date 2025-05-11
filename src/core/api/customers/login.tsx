import { tokenCache } from '@/core/api/token/token-store.tsx';
import { withPasswordFlow } from '@/core/api/middlewere/password-flow.tsx';
import { withRefreshTokenFlow } from '@/core/api/middlewere/refresh-token-flow.tsx';
import { CartSignInModeEnum, LocalStorageKeys } from '@/constants/constants';
import { ByProjectKeyRequestBuilder, CustomerSignInResult } from '@commercetools/platform-sdk';
import { ClientResponse } from '@commercetools/ts-client';

export async function loginCustomers(email: string, password: string): Promise<CustomerSignInResult | null> {
  try {
    const anonymousCartId: string | null = localStorage.getItem(LocalStorageKeys.ANONYMOUS_CART_ID);
    const refreshToken: string | undefined = tokenCache.get().refreshToken;

    if (anonymousCartId && refreshToken) {
      const refreshTokenClient: ByProjectKeyRequestBuilder = withRefreshTokenFlow(refreshToken);
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

    if (!response.body) {
      return null;
    }
    return response.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Login failed: Unknown error');
    }
  }
}
