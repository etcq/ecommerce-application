import { withRefreshTokenFlow } from '@/core/api/middlewere/refresh-token-flow.ts';
import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { LocalStorageKeys } from '@/constants/constants.ts';
import { useCartStore } from '@/core/stores/use-cart-state.ts';

export const getActiveCart = async () => {
  const token: string | null = localStorage.getItem(LocalStorageKeys.TOKEN);
  if (!token) {
    throw new Error('No refresh token found in localStorage');
  }

  try {
    const response: ClientResponse<Cart> = await withRefreshTokenFlow(token).me().activeCart().get().execute();

    useCartStore.getState().setCart(response.body);
    useCartStore.getState().setLineItems(
      response.body.lineItems.map((item) => {
        return {
          lineItemId: item.id,
          sku: item.variant.sku,
          productId: item.productId,
          quantity: item.quantity,
        };
      }),
    );
    return response.body;
  } catch {
    return null;
  }
};
