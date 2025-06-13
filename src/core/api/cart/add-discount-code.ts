import { ACTIONS } from '@/constants/constants.ts';
import { Cart, ClientResponse, MyCartAddDiscountCodeAction } from '@commercetools/platform-sdk';
import { getApiClientForUser } from '@/core/services/api-client-options.ts';
import { tokenCache } from '@/core/api/token/token-store.ts';

export const addDiscountCode = async (cartId: string, version: number, code: string): Promise<Cart> => {
  const userToken: string | undefined = tokenCache.get().refreshToken;
  const discountData: MyCartAddDiscountCodeAction = {
    action: ACTIONS.ADD_DISCOUNT_CODE,
    code,
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
