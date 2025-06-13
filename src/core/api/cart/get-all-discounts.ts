import { withClientCredentialsFlow } from '@/core/api/middlewere/client-credentials.ts';
import { DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';

export const getAllDiscounts = async (): Promise<DiscountCodePagedQueryResponse> => {
  try {
    const response = await withClientCredentialsFlow().discountCodes().get().execute();
    return response.body;
  } catch (error) {
    console.error('Failed to get discount code:', error);
    throw error;
  }
};
