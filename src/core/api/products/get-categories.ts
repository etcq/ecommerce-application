import { Category } from '@commercetools/platform-sdk';

import { withClientCredentialsFlow } from '@/core/api/middlewere/client-credentials.ts';
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await withClientCredentialsFlow()
      .categories()
      .get({ queryArgs: { limit: 40 } })
      .execute();

    return response.body.results;
  } catch (error) {
    console.error("Can't get top-level categories", error);
    return [];
  }
};
