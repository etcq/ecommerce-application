import { Customer, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import { ClientResponse } from '@commercetools/ts-client';
import { buildClient} from "@/core/api/client/client-build.tsx";

export async function createCustomers(customerData: CustomerDraft): Promise<Customer | undefined> {
  try {
    const response: ClientResponse<CustomerSignInResult> = await buildClient()
      .customers()
      .post({ body: customerData })
      .execute();
    console.log(`customer ${response.body?.customer} created successful!`);
    return response.body?.customer;
  } catch (error) {
    console.log('Error create customer: ', error);
    throw error;
  }
}
