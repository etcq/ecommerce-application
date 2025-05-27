import styles from './user.module.scss';
import formStyles from '@/components/form/registration/registration-form.module.scss';
import inputStyles from '@/components/form/input/input.module.scss';
import Button from '@/components/button/Button';
import Input from '../input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { TUserFormFields, userFormSchema } from './validation-scheme';
import { useAuthStore } from '@/core/stores/use-auth-state';
import React, { useState } from 'react';
import { Address } from '@commercetools/platform-sdk';
import { updateCustomer } from '@/core/api/customers/update';
import { useToastStore } from '@/core/stores/toast';
import { AuthMessages } from '@/constants/constants';

const formatAddress = (address: Address) => {
  return `${address?.streetName}, ${address?.city}, ${address?.postalCode}, ${address?.country}`;
};

const UserForm: React.FC = () => {
  const { customer } = useAuthStore();
  const userAddresses = customer?.addresses;
  const shippingAddress = customer?.addresses.find((address) => address.id === customer.defaultShippingAddressId);
  const billingAddress = customer?.addresses.find((address) => address.id === customer.defaultBillingAddressId);

  const {
    register,
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
  } = useForm<TUserFormFields>({
    resolver: zodResolver(userFormSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: customer?.firstName,
      lastName: customer?.lastName,
      email: customer?.email,
      dateOfBirth: customer?.dateOfBirth,
      address: {
        streetName: '',
        city: '',
        postalCode: '',
        country: 'select',
      },
      addresses: userAddresses?.map((addr) => ({
        streetName: addr.streetName,
        city: addr.city,
        postalCode: addr.postalCode,
        country: addr.country,
      })),
    },
  });

  const [error, setError] = React.useState<string | null>(null);
  const [isEditUserMode, setIsEditUserMode] = useState(true);
  const [isEditAddressMode, setIsEditAddressMode] = useState<Record<string, boolean>>({});
  const [addAddress, setAddAddress] = useState(true);
  const newAddress = useWatch({ control, name: 'address' });
  const addressesFormValues = useWatch({ control, name: 'addresses' });

  const toggleEdit = (address: Address) => () => {
    setIsEditAddressMode((prev) => ({ ...prev, [`${address.id}`]: !prev[`${address.id}`] }));
  };

  const hasAddressErrors = (index?: number) => {
    let error = errors.address;
    if (index) {
      error = errors.addresses?.[index];
    }
    return !!(error?.streetName ?? error?.city ?? error?.postalCode ?? error?.country);
  };

  const handleAddNewAddress = async () => {
    setError(null);
    try {
      const updateActions = [
        {
          action: 'addAddress',
          address: {
            streetName: newAddress?.streetName,
            city: newAddress?.city,
            postalCode: newAddress?.postalCode,
            country: newAddress?.country,
          },
        },
      ];

      await updateCustomer(customer?.id, customer?.version, updateActions);
      setAddAddress(true);
      useToastStore.getState().setMessage('New address added successfully!');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleRemoveAddress = async (index: number) => {
    setError(null);
    try {
      const updateActions = [
        {
          action: 'removeAddress',
          addressId: customer?.addresses[index].id,
        },
      ];

      await updateCustomer(customer?.id, customer?.version, updateActions);
      useToastStore.getState().setMessage('Address deleted successfully!');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const onSubmit = async (formData: TUserFormFields): Promise<void> => {
    setError(null);
    try {
      const updateActions = [];
      const formDate =
        formData.dateOfBirth instanceof Date ? formData.dateOfBirth.toISOString().split('T')[0] : formData.dateOfBirth;
      const customerDate = customer?.dateOfBirth
        ? new Date(customer.dateOfBirth).toISOString().split('T')[0]
        : undefined;

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
      if (formData.addresses && customer?.addresses) {
        formData.addresses.forEach((newAddr, id) => {
          const oldAddress = customer.addresses[id];
          const isChanged =
            newAddr.streetName !== oldAddress.streetName ||
            newAddr.city !== oldAddress.city ||
            newAddr.postalCode !== oldAddress.postalCode ||
            newAddr.country !== oldAddress.country;

          if (isChanged) {
            updateActions.push({
              action: 'changeAddress',
              addressId: oldAddress.id,
              address: {
                ...oldAddress,
                streetName: newAddr.streetName,
                city: newAddr.city,
                postalCode: newAddr.postalCode,
                country: newAddr.country,
              },
            });
          }
        });
      }

      if (updateActions.length === 0) return;

      await updateCustomer(customer?.id, customer?.version, updateActions);
      useToastStore.getState().setMessage(AuthMessages.UPDATE);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className={styles.form}>
      <div className={formStyles.title}>
        <h1>Account Settings</h1>
      </div>

      <form className={formStyles.form} onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <div className={styles['header-wrapper']}>
          <h3>User Information</h3>
          <Button type="button" size="x-small" onClick={() => setIsEditUserMode((prev) => !prev)}>
            Edit
          </Button>
        </div>

        <div className={formStyles['input-wrapper-row']}>
          <div className={formStyles['input-wrapper']}>
            <Input
              disabled={isEditUserMode}
              {...register('firstName')}
              id="first-name"
              label="First Name"
              placeholder="John"
              error={errors.firstName?.message}
            ></Input>
          </div>

          <div className={formStyles['input-wrapper']}>
            <Input
              disabled={isEditUserMode}
              {...register('lastName')}
              id="last-name"
              label="Last Name"
              placeholder="Doe"
              error={errors.lastName?.message}
            ></Input>
          </div>
        </div>

        <div className={formStyles['input-wrapper-row']}>
          <div className={formStyles['input-wrapper']}>
            <Input
              disabled={isEditUserMode}
              {...register('email')}
              id="email"
              label="Email"
              placeholder="johndoe@email.com"
              error={errors.email?.message}
            ></Input>
          </div>

          <div className={formStyles['input-wrapper']}>
            <Input
              disabled={isEditUserMode}
              {...register('dateOfBirth')}
              id="date-of-birth"
              label="Date of Birth"
              type="date"
              placeholder="mm/dd/yyyy"
              error={errors.dateOfBirth?.message}
            ></Input>
          </div>
        </div>

        <div className={styles['header-wrapper']}>
          <h3>Address Information</h3>
          <Button size="x-small" onClick={() => setAddAddress((prev) => !prev)}>
            Add New Address
          </Button>
        </div>

        {!addAddress && (
          <div className={styles.edit}>
            <div className={formStyles['input-wrapper-row']}>
              <div className={formStyles['input-wrapper']}>
                <Input
                  {...register(`address.streetName`)}
                  id="address-street"
                  label="Street"
                  placeholder="123 Maple Street"
                  error={errors.address?.streetName?.message}
                ></Input>
              </div>

              <div className={formStyles['input-wrapper']}>
                <Input
                  {...register(`address.city`)}
                  id="address-city"
                  label="City"
                  placeholder="Anytown"
                  error={errors.address?.city?.message}
                ></Input>
              </div>
            </div>

            <div className={formStyles['input-wrapper-row']}>
              <div className={formStyles['input-wrapper']}>
                <Input
                  maxLength={5}
                  {...register(`address.postalCode`)}
                  id="address-zip"
                  label="Postal Code"
                  placeholder="12345"
                  error={errors.address?.postalCode?.message}
                ></Input>
              </div>

              <div className={formStyles['input-wrapper']}>
                <label htmlFor="address-country">Country</label>
                <select {...register(`address.country`)} className={inputStyles.input} id="address-country">
                  <option value="select" disabled>
                    Select Country
                  </option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                </select>
                <span className={formStyles['input-error']}>{errors.address?.country?.message}</span>
              </div>
            </div>
            <Button
              disabled={hasAddressErrors()}
              type="submit"
              size="medium"
              onClick={() => void handleAddNewAddress()}
            >
              Add Address
            </Button>
          </div>
        )}

        <div className={formStyles['input-wrapper-row']}>
          <div className={formStyles['input-wrapper']}>
            {shippingAddress && (
              <Input
                disabled
                defaultValue={formatAddress(shippingAddress)}
                id="shipping-address"
                label="Shipping Address"
              ></Input>
            )}
          </div>

          <div className={formStyles['input-wrapper']}>
            {billingAddress && (
              <Input
                disabled
                defaultValue={formatAddress(billingAddress)}
                id="billing-address"
                label="Billing Address"
              ></Input>
            )}
          </div>
        </div>

        {userAddresses?.map((address, index) => (
          <div className={styles.address} key={address.id}>
            {!isEditAddressMode[address.id!] ? (
              <>
                <Input
                  disabled
                  label={`Address ${index + 1}`}
                  defaultValue={formatAddress(addressesFormValues?.[index])}
                  id={`address-${index + 1}`}
                ></Input>
                <Button type="button" size="small" onClick={toggleEdit(address)}>
                  Edit
                </Button>
                <Button type="button" size="small" onClick={() => void handleRemoveAddress(index)}>
                  Delete
                </Button>
              </>
            ) : (
              <div className={styles.edit}>
                <div className={formStyles['input-wrapper-row']}>
                  <div className={formStyles['input-wrapper']}>
                    <Input
                      {...register(`addresses.${index}.streetName`)}
                      defaultValue={customer?.addresses[index].streetName}
                      id="address-street"
                      label="Street"
                      placeholder="123 Maple Street"
                      error={errors.addresses?.[index]?.streetName?.message}
                    ></Input>
                  </div>

                  <div className={formStyles['input-wrapper']}>
                    <Input
                      {...register(`addresses.${index}.city`)}
                      id="address-city"
                      label="City"
                      placeholder="Anytown"
                      error={errors.addresses?.[index]?.city?.message}
                    ></Input>
                  </div>
                </div>

                <div className={formStyles['input-wrapper-row']}>
                  <div className={formStyles['input-wrapper']}>
                    <Input
                      maxLength={5}
                      {...register(`addresses.${index}.postalCode`)}
                      id="address-zip"
                      label="Postal Code"
                      placeholder="12345"
                      error={errors.addresses?.[index]?.postalCode?.message}
                    ></Input>
                  </div>

                  <div className={formStyles['input-wrapper']}>
                    <label htmlFor="address-country">Country</label>
                    <select
                      {...register(`addresses.${index}.country`)}
                      className={inputStyles.input}
                      id="address-country"
                    >
                      <option value="select" disabled>
                        Select Country
                      </option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                    </select>
                    <span className={formStyles['input-error']}>{errors.addresses?.[index]?.country?.message}</span>
                  </div>
                </div>
                <Button disabled={hasAddressErrors(index)} type="button" size="medium" onClick={toggleEdit(address)}>
                  Done
                </Button>
              </div>
            )}
          </div>
        ))}

        <span className={styles.error}>{error}</span>
        <Button className={formStyles.submit} disabled={isSubmitting} type="submit" size="large">
          {isSubmitting ? 'Loading...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
