import { withAnonymousSessionFlow } from '@/core/api/middlewere/anonymous-session-flow.ts';
import { Cart, ClientResponse } from '@commercetools/platform-sdk';

export const createAnonymousCart = async (): Promise<Cart> => {
  const body = {
    currency: 'USD',
  };

  const response: ClientResponse<Cart> = await withAnonymousSessionFlow().me().carts().post({ body }).execute();
  return response.body;
};
