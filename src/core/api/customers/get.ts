import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { withRefreshTokenFlow } from '@/core/api/middlewere/refresh-token-flow';
import { useTokenCacheStore } from '@/core/stores/use-token.ts';
import { ClientResponse } from '@commercetools/ts-client';
import { Customer } from '@commercetools/platform-sdk';

export const getCustomer = async (): Promise<Customer> => {
  const tokenData = useTokenCacheStore.getState();
  if (!tokenData.refreshToken) {
    throw new Error('No refresh token found');
  }

  const client: ByProjectKeyRequestBuilder = withRefreshTokenFlow(tokenData.refreshToken);
  const response: ClientResponse<Customer> = await client.me().get().execute();

  if (!response.body) {
    throw new Error('Customer not found');
  }

  return response.body;
};
