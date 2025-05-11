import { Customer, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import { ClientResponse } from '@commercetools/ts-client';
import { buildClient } from '@/core/api/client/client-build.tsx';

export async function createCustomers(customerData: CustomerDraft): Promise<Customer | undefined> {
  try {
    const response: ClientResponse<CustomerSignInResult> = await buildClient()
      .customers()
      .post({ body: customerData })
      .execute();
    return response.body?.customer;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Create customer: Unknown error');
    }
  }
}
