import { CustomerUpdateAction, Address, Customer } from '@commercetools/platform-sdk';
import { updateCustomer } from '@/core/api/customers/update';
import { TUserFormFields } from '@/components/form/user/validation-scheme';
import { useToastStore } from '@/core/stores/toast';
import { UserUpdateMessages } from '@/constants/constants';

export const useUserFormHandlers = (
  customer: Customer | null,
  fetchCustomer: () => Promise<void>,
  getValues: () => TUserFormFields,
  setError: (msg: string | null) => void,
) => {
  const handleCustomerUpdate = async (actions: CustomerUpdateAction[], successMessage: string): Promise<void> => {
    setError(null);
    try {
      if (!customer) return;
      await updateCustomer(customer.id, customer.version, actions);
      await fetchCustomer();
      useToastStore.getState().setMessage(successMessage);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleSaveAddress = async (index: number, address: Address): Promise<void> => {
    const formData = getValues();
    const addressData = formData.addresses?.[index];
    if (!addressData || !customer) return;

    const updateActions: CustomerUpdateAction[] = [
      {
        action: 'changeAddress',
        addressId: address.id,
        address: {
          ...address,
          streetName: addressData.streetName,
          city: addressData.city,
          postalCode: addressData.postalCode,
          country: addressData.country,
        },
      },
    ];

    await handleCustomerUpdate(updateActions, UserUpdateMessages.ADDRESS_UPDATE);
  };

  const handleAddNewAddress = async (newAddress: Address): Promise<void> => {
    if (!newAddress || !customer) return;

    const updateActions: CustomerUpdateAction[] = [
      {
        action: 'addAddress',
        address: newAddress,
      },
    ];

    await handleCustomerUpdate(updateActions, UserUpdateMessages.ADDRESS_NEW);
  };

  const handleRemoveAddress = async (index: number): Promise<void> => {
    const addressId = customer?.addresses[index]?.id;
    if (!addressId || !customer) return;

    const updateActions: CustomerUpdateAction[] = [
      {
        action: 'removeAddress',
        addressId,
      },
    ];

    await handleCustomerUpdate(updateActions, UserUpdateMessages.ADDRESS_REMOVE);
  };

  const handleSetDefaultShippingAddress = async (addressId: string): Promise<void> => {
    if (!customer) return;
    const updateActions: CustomerUpdateAction[] = [
      {
        action: 'setDefaultShippingAddress',
        addressId,
      },
    ];

    await handleCustomerUpdate(updateActions, UserUpdateMessages.ADDRESS_SHIPPING);
  };

  const handleSetDefaultBillingAddress = async (addressId: string): Promise<void> => {
    if (!customer) return;
    const updateActions: CustomerUpdateAction[] = [
      {
        action: 'setDefaultBillingAddress',
        addressId,
      },
    ];

    await handleCustomerUpdate(updateActions, UserUpdateMessages.ADDRESS_BILLING);
  };

  const handleUserFormSubmit = (formData: TUserFormFields): CustomerUpdateAction[] => {
    const updateActions: CustomerUpdateAction[] = [];

    const formDate =
      formData.dateOfBirth instanceof Date ? formData.dateOfBirth.toISOString().split('T')[0] : formData.dateOfBirth;

    const customerDate = customer?.dateOfBirth ? new Date(customer.dateOfBirth).toISOString().split('T')[0] : undefined;

    if (formData.firstName !== customer?.firstName) {
      updateActions.push({ action: 'setFirstName', firstName: formData.firstName });
    }
    if (formData.lastName !== customer?.lastName) {
      updateActions.push({ action: 'setLastName', lastName: formData.lastName });
    }
    if (formData.email !== customer?.email) {
      updateActions.push({ action: 'changeEmail', email: formData.email });
    }
    if (formDate !== customerDate) {
      updateActions.push({ action: 'setDateOfBirth', dateOfBirth: formDate });
    }

    return updateActions;
  };

  return {
    handleCustomerUpdate,
    handleSaveAddress,
    handleAddNewAddress,
    handleRemoveAddress,
    handleSetDefaultShippingAddress,
    handleSetDefaultBillingAddress,
    handleUserFormSubmit,
  };
};
