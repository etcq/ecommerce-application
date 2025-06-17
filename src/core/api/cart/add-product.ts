import { MyCartAddLineItemAction, Cart, ClientResponse } from '@commercetools/platform-sdk';
import { ACTIONS } from '@/constants/constants.ts';
import { getApiClientForUser } from '@/core/services/api-client-options.ts';
import { IProductParams } from '@/interfaces/interfaces.ts';

export const addProductToCart = async (productParams: IProductParams, quantity = 1): Promise<Cart> => {
  const { cartId, version, productId, variantId, userToken } = productParams;

  try {
    const cartData: MyCartAddLineItemAction = {
      action: ACTIONS.ADD_LINE_ITEM,
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
