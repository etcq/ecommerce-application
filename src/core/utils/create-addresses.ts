import { TFormFields } from '@components/form/registration/validation-scheme.ts';
import { BaseAddress } from '@commercetools/platform-sdk';

export interface IAddressDataResult {
  addresses: BaseAddress[];
  billingIndex: number | undefined;
  shippingIndex: number;
}

export const createAddresses = (data: TFormFields, useShippingAsBilling: boolean): IAddressDataResult => {
  const addresses: BaseAddress[] = [];

  const shippingAddress: BaseAddress = {
    streetName: data.address.street,
    city: data.address.city,
    postalCode: data.address.zip,
    country: data.address.country,
  };

  addresses.push(shippingAddress);
  const shippingIndex = 0;

  let billingIndex: number | undefined;

  if (useShippingAsBilling) {
    billingIndex = shippingIndex;
  } else if (data.billing) {
    const billingAddress: BaseAddress = {
      streetName: data.billing.street,
      city: data.billing.city,
      postalCode: data.billing.zip,
      country: data.billing.country,
    };
    addresses.push(billingAddress);
    billingIndex = 1;
  }

  return { addresses, billingIndex, shippingIndex };
};
