import { MyCartChangeLineItemQuantityAction, Cart, ClientResponse } from '@commercetools/platform-sdk';
import { ACTIONS } from '@/constants/constants.ts';
import { getApiClientForUser } from '@/core/services/api-client-options.ts';
import { IProductParams } from '@/interfaces/interfaces.ts';

type TSetQuantityParams = Omit<IProductParams, 'variantId' | 'productId'> & {
  lineItemId: string;
  quantity: number;
};

export const changeProductQuantity = async (params: TSetQuantityParams, userToken?: string): Promise<Cart> => {
  const { cartId, version, lineItemId, quantity } = params;
  const cartData: MyCartChangeLineItemQuantityAction = {
    action: ACTIONS.CHANGE_LINE_ITEM_QUANTITY,
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
