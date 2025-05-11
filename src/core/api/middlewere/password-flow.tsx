import {
  ClientBuilder,
  Client,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type TokenCache,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, type ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

export const withPasswordFlow = (
  username: string,
  password: string,
  tokenCache: TokenCache,
): ByProjectKeyRequestBuilder | null => {
  const projectKey = String(import.meta.env.VITE_CTP_PROJECT_KEY);

  const authOptions: PasswordAuthMiddlewareOptions = {
    host: String(import.meta.env.VITE_CTP_AUTH_URL),
    projectKey: projectKey,
    credentials: {
      clientId: String(import.meta.env.VITE_CTP_CLIENT_ID),
      clientSecret: String(import.meta.env.VITE_CTP_CLIENT_SECRET),
      user: {
        username,
        password,
      },
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
    .withProjectKey(projectKey)
    .withPasswordFlow(authOptions)
    .withHttpMiddleware(httpOptions)
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: projectKey });
};
