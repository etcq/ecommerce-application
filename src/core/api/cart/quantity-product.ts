import { MyCartChangeLineItemQuantityAction, Cart, ClientResponse } from '@commercetools/platform-sdk';
import { ACTIONS } from '@/constants/constants.ts';
import { getApiClientForUser } from '@/core/services/api-client-options.ts';

export const changeProductQuantity = async (
  cartId: string,
  version: number,
  lineItemId: string,
  quantity: number,
  userToken?: string,
): Promise<Cart> => {
  const cartData: MyCartChangeLineItemQuantityAction = {
    action: ACTIONS.changeLineItemQuantity,
    lineItemId,
    quantity,
  };

  const body = {
    version,
    cartId,
    actions: [cartData],
  };
  try {
    const response: ClientResponse<Cart> = await getApiClientForUser({ userToken })
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({ body })
      .execute();
    return response.body;
  } catch (error) {
    console.error('Failed to change product quantity:', error);
    throw error;
  }
};
