import { withAnonymousSessionFlow } from '@/core/api/middlewere/anonymous-session-flow.ts';
import { withRefreshTokenFlow } from '@/core/api/middlewere/refresh-token-flow.ts';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

interface IApiClientOptions {
  userToken?: string | null;
}

export const getApiClientForUser = ({ userToken }: IApiClientOptions): ByProjectKeyRequestBuilder => {
  if (userToken) {
    return withRefreshTokenFlow(userToken);
  }
  return withAnonymousSessionFlow();
};
