import type { HttpMiddlewareOptions, RefreshAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { ClientBuilder, Client } from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { tokenCache } from '@/core/api/token/token-store.tsx';

export async function withRefreshTokenFlow(refreshToken: string): Promise<ByProjectKeyRequestBuilder> {
  const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;
  const options: RefreshAuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey: projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    },
    refreshToken,
    tokenCache,
    fetch,
  };
  const httpOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_API_URL,
    fetch,
  };

  const ctpClient: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withRefreshTokenFlow(options)
    .withHttpMiddleware(httpOptions)
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: projectKey,
  });
}
