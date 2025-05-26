import { CustomerUpdateAction } from '@commercetools/platform-sdk';
import { buildClient } from '../client/client-build';

export const updateCustomer = async (customerId: string, version: number, actions: CustomerUpdateAction[]) => {
  try {
    const response = await buildClient()
      .customers()
      .withId({ ID: customerId })
      .post({ body: { version, actions } })
      .execute();

    return response.body;
  } catch (error) {
    console.error('Failed to update customer:', error);
    throw new Error('Failed to update customer:');
  }
};
