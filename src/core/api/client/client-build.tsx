import {
  ClientBuilder,
  Client,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/ts-client';
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;

export function buildClient(): ByProjectKeyRequestBuilder {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey: projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    },
    scopes: [import.meta.env.VITE_CTP_SCOPES],
    httpClient: fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_API_URL,
    httpClient: fetch,
  };

  const ctpClient: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: projectKey });
}
