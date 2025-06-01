import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import type { AuthMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

export const withClientCredentialsFlow = (): ByProjectKeyRequestBuilder => {
  const projectKey = String(import.meta.env.VITE_CTP_PROJECT_KEY);

  const authOptions: AuthMiddlewareOptions = {
    host: String(import.meta.env.VITE_CTP_AUTH_URL),
    projectKey: projectKey,
    credentials: {
      clientId: String(import.meta.env.VITE_CTP_CLIENT_ID),
      clientSecret: String(import.meta.env.VITE_CTP_CLIENT_SECRET),
    },
    scopes: [import.meta.env.VITE_CTP_SCOPES],
    fetch,
  };

  const httpOptions: HttpMiddlewareOptions = {
    host: String(import.meta.env.VITE_CTP_API_URL),
    fetch,
  };

  const ctpClient: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authOptions)
    .withHttpMiddleware(httpOptions)
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: projectKey });
};
