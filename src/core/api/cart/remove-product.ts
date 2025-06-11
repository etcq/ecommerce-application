import { MyCartRemoveLineItemAction, Cart, ClientResponse } from '@commercetools/platform-sdk';
import { ACTIONS } from '@/constants/constants.ts';
import { getApiClientForUser } from '@/core/services/api-client-options.ts';

export const removeLineItem = async (
  cartId: string,
  version: number,
  lineItemId: string,
  userToken?: string,
): Promise<Cart> => {
  const cartData: MyCartRemoveLineItemAction = {
    action: ACTIONS.REMOVE_LINE_ITEM,
    lineItemId,
  };

  const body = {
    version,
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
    console.error('Error removing line item from cart: ', error);
    throw error;
  }
};
