// import { withAnonymousSessionFlow } from '@/core/api/middlewere/anonymous-session-flow.ts';
import { MyCartAddLineItemAction, Cart, ClientResponse } from '@commercetools/platform-sdk';
import { ACTIONS } from '@/constants/constants.ts';
import { getApiClientForUser } from '@/core/services/api-client-options.ts';

export const addProductToCart = async (
  cartId: string,
  version: number,
  productId: string,
  variantId: number,
  userToken?: string | null,
  quantity = 1,
): Promise<Cart> => {
  try {
    const cartData: MyCartAddLineItemAction = {
      action: ACTIONS.addLineItem,
      productId,
      variantId,
      quantity,
    };

    const body = {
      version,
      actions: [cartData],
    };

    const response: ClientResponse<Cart> = await getApiClientForUser({ userToken })
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({ body })
      .execute();
    return response.body;
  } catch (error) {
    console.error('Failed to add product to currentCart:', error);
    throw error;
  }
};
