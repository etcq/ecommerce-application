import {
  ClientBuilder,
  Client,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/ts-client';
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = String(import.meta.env.VITE_CTP_PROJECT_KEY);

export function buildClient(): ByProjectKeyRequestBuilder {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: String(import.meta.env.VITE_CTP_AUTH_URL),
    projectKey: projectKey,
    credentials: {
      clientId: String(import.meta.env.VITE_CTP_CLIENT_ID),
      clientSecret: String(import.meta.env.VITE_CTP_CLIENT_SECRET),
    },
    scopes: [import.meta.env.VITE_CTP_SCOPES],
    httpClient: fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: String(import.meta.env.VITE_CTP_API_URL),
    httpClient: fetch,
  };

  const ctpClient: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: projectKey });
}
