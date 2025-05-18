import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { TFormFields } from '@components/form/registration/validation-scheme.ts';
import { IAddressDataResult } from '@/core/utils/create-addresses.ts';

export const createCustomerDraft = (
  data: TFormFields,
  addressesData: IAddressDataResult,
  useAsDefaultBilling: boolean,
  useAsDefaultShipping: boolean,
): MyCustomerDraft => ({
  email: data.email,
  firstName: data.firstName,
  lastName: data.lastName,
  password: data.password,
  dateOfBirth: data.dateOfBirth.toISOString().split('T')[0],
  addresses: addressesData.addresses,
  defaultBillingAddress: useAsDefaultBilling ? addressesData.billingIndex : undefined,
  defaultShippingAddress: useAsDefaultShipping ? addressesData.shippingIndex : undefined,
});
