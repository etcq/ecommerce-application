import type { HttpMiddlewareOptions, RefreshAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { ClientBuilder, Client } from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { tokenCache } from '@/core/stores/use-token.ts';

export function withRefreshTokenFlow(refreshToken: string): ByProjectKeyRequestBuilder {
  const projectKey = String(import.meta.env.VITE_CTP_PROJECT_KEY);
  const options: RefreshAuthMiddlewareOptions = {
    host: String(import.meta.env.VITE_CTP_AUTH_URL),
    projectKey: projectKey,
    credentials: {
      clientId: String(import.meta.env.VITE_CTP_CLIENT_ID),
      clientSecret: String(import.meta.env.VITE_CTP_CLIENT_SECRET),
    },
    refreshToken,
    tokenCache,
    fetch,
  };
  const httpOptions: HttpMiddlewareOptions = {
    host: String(import.meta.env.VITE_CTP_API_URL),
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
