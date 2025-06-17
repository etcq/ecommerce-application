import { ACTIONS } from '@/constants/constants.ts';
import { Cart, ClientResponse, MyCartRemoveDiscountCodeAction } from '@commercetools/platform-sdk';
import { getApiClientForUser } from '@/core/services/api-client-options.ts';
import { tokenCache } from '@/core/api/token/token-store.ts';

export const removeDiscountCode = async (cartId: string, version: number, discountId: string): Promise<Cart> => {
  const userToken: string | undefined = tokenCache.get().refreshToken;
  const discountData: MyCartRemoveDiscountCodeAction = {
    action: ACTIONS.REMOVE_DISCOUNT_CODE,
    discountCode: {
      typeId: 'discount-code',
      id: discountId,
    },
  };

  const body = {
    version,
    actions: [discountData],
  };

  const response: ClientResponse<Cart> = await getApiClientForUser({ userToken })
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({ body })
    .execute();
  return response.body;
};
