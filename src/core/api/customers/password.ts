import { withPasswordFlow } from '../middlewere/password-flow';
import { useAuthStore } from '@/core/stores/use-auth.ts';
import { tokenCache } from '../../stores/use-token.ts';

export const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const { customer, fetchCustomer } = useAuthStore.getState();

    if (!customer) {
      await fetchCustomer();
    }

    const freshCustomer = useAuthStore.getState().customer;
    if (!freshCustomer) {
      return null;
    }

    const client = withPasswordFlow(currentPassword, newPassword, tokenCache);
    if (!client) {
      return null;
    }

    await client
      .customers()
      .password()
      .post({
        body: {
          id: freshCustomer.id,
          version: freshCustomer.version,
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
      })
      .execute();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
