import { MyCustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import { ClientResponse } from '@commercetools/ts-client';
import { withAnonymousSessionFlow } from '@/core/api/middlewere/anonymous-session-flow';

export const registerCustomer = async (customerDraft: MyCustomerDraft): Promise<CustomerSignInResult> => {
  const apiRoot = withAnonymousSessionFlow();

  const response: ClientResponse<CustomerSignInResult> = await apiRoot
    .me()
    .signup()
    .post({ body: customerDraft })
    .execute();
  if (!response.body) {
    console.log('Empty response from API');
    throw new Error('Empty response from API');
  }
  return response.body;
};
