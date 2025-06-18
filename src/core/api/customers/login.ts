import { tokenCache } from '@/core/api/token/token-store.ts';
import { withPasswordFlow } from '@/core/api/middlewere/password-flow.ts';
import { CartSignInModeEnum, LocalStorageKeys } from '@/constants/constants';
import { ByProjectKeyRequestBuilder, CustomerSignInResult } from '@commercetools/platform-sdk';
import { ClientResponse } from '@commercetools/ts-client';
import { getActiveCart } from '@/core/api/cart/get-active-cart.ts';

export async function loginCustomers(email: string, password: string): Promise<CustomerSignInResult | null> {
  try {
    const anonymousCartId: string | null = localStorage.getItem(LocalStorageKeys.ANONYMOUS_CART_ID);

    tokenCache.clear();

    const passwordFlowClient: ByProjectKeyRequestBuilder | null = withPasswordFlow(email, password, tokenCache);

    if (!passwordFlowClient) {
      return null;
    }

    const data: {
      email: string;
      password: string;
      anonymousCartId?: string;
      activeCartSignInMode?: CartSignInModeEnum;
      updateProductData?: boolean;
    } = {
      email,
      password,
    };

    if (anonymousCartId) {
      data.anonymousCartId = anonymousCartId;
      data.activeCartSignInMode = CartSignInModeEnum.MergeWithExistingCustomerCart;
      data.updateProductData = true;
    }

    const response: ClientResponse<CustomerSignInResult> = await passwordFlowClient
      .me()
      .login()
      .post({
        body: data,
      })
      .execute();

    if (!response.body) {
      return null;
    }

    localStorage.removeItem(LocalStorageKeys.ANONYMOUS_CART_ID);
    localStorage.removeItem(LocalStorageKeys.ANONYMOUS_ID);

    await getActiveCart();

    return response.body;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Login failed: An unknown error occurred');
    }
  }
}
