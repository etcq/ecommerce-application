import {
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
  AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { tokenCache } from '@/core/api/token/token-store.ts';
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export function withAnonymousSessionFlow(): ByProjectKeyRequestBuilder {
  const projectKey = String(import.meta.env.VITE_CTP_PROJECT_KEY);
  const options: AnonymousAuthMiddlewareOptions = {
    host: String(import.meta.env.VITE_CTP_AUTH_URL),
    projectKey: projectKey,
    credentials: {
      clientId: String(import.meta.env.VITE_CTP_CLIENT_ID),
      clientSecret: String(import.meta.env.VITE_CTP_CLIENT_SECRET),
    },
    scopes: [import.meta.env.VITE_CTP_SCOPES],
    tokenCache,
    fetch,
  };
  const httpOptions: HttpMiddlewareOptions = {
    host: String(import.meta.env.VITE_CTP_API_URL),
    fetch,
  };

  const ctpClient: Client = new ClientBuilder()
    .withAnonymousSessionFlow(options)
    .withHttpMiddleware(httpOptions)
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: projectKey,
  });
}
