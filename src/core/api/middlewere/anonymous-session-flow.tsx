import {
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
  AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { tokenCache } from '@/core/api/token/token-store.tsx';
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export async function withAnonymusSessionFlow(): Promise<ByProjectKeyRequestBuilder> {
  const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;
  const options: AnonymousAuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey: projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    },
    scopes: [import.meta.env.VITE_CTP_SCOPES],
    tokenCache,
    fetch,
  };
  const httpOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_API_URL,
    fetch,
  };

  const ctpClient: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(options)
    .withHttpMiddleware(httpOptions)
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: projectKey,
  });
}
