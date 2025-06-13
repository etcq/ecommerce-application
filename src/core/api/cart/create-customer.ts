import { withRefreshTokenFlow } from '@/core/api/middlewere/refresh-token-flow.ts';
import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { tokenCache } from '@/core/api/token/token-store.ts';

export const createCustomerCart = async (): Promise<Cart> => {
  const token: string | undefined = tokenCache.get().refreshToken;

  const body = {
    currency: 'USD',
  };

  const response: ClientResponse<Cart> = await withRefreshTokenFlow(token ?? '')
    .me()
    .carts()
    .post({ body })
    .execute();
  return response.body;
};
