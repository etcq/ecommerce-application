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

    return response.body;
  } catch (error) {
    if (error instanceof Error) {
      return null;
    }
  }
};
