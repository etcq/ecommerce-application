import styles from './user.module.scss';
import formStyles from '@/components/form/registration/registration-form.module.scss';
import Button from '@/components/button/Button';
import Input from '../input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { TUserFormFields, userFormSchema } from './validation-scheme';
import { useAuthStore } from '@/core/stores/use-auth-state';
import React, { useEffect, useState } from 'react';
import { Address } from '@commercetools/platform-sdk';
import { UserUpdateMessages } from '@/constants/constants';
import { NavLink } from 'react-router';
import AddressModal from './address/address-modal/AddressModal';
import AddressFormFields from './address/address-fields/AddressFields';
import { useUserFormHandlers } from '@/core/hooks/handle-customer-update';

const formatAddress = (address: Address) => {
  return `${address?.streetName}, ${address?.city}, ${address?.postalCode}, ${address?.country}`;
};

const UserForm: React.FC = () => {
  const { customer, fetchCustomer } = useAuthStore();
  const userAddresses = customer?.addresses;
  const shippingAddress = customer?.addresses.find((address) => address.id === customer.defaultShippingAddressId);
  const billingAddress = customer?.addresses.find((address) => address.id === customer.defaultBillingAddressId);

  const {
    register,
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    reset,
    resetField,
    getValues,
  } = useForm<TUserFormFields>({
    resolver: zodResolver(userFormSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: customer?.firstName,
      lastName: customer?.lastName,
      email: customer?.email,
      dateOfBirth: customer?.dateOfBirth,
      addresses: userAddresses?.map((addr) => ({
        streetName: addr.streetName,
        city: addr.city,
        postalCode: addr.postalCode,
        country: addr.country,
      })),
    },
  });

  useEffect(() => {
    if (customer) {
      reset({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        dateOfBirth: customer.dateOfBirth,
        addresses: customer.addresses?.map((addr) => ({
          streetName: addr.streetName,
          city: addr.city,
          postalCode: addr.postalCode,
          country: addr.country,
        })),
      });
    }
  }, [customer, reset]);

  const [error, setError] = React.useState<string | null>(null);
  const [isEditUserMode, setIsEditUserMode] = useState(true);
  const newAddress = useWatch({ control, name: 'address' });
  const [modalAddressIndex, setModalAddressIndex] = useState<number | null>(null);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  const openModal = (index: number) => setModalAddressIndex(index);
  const closeModal = () => setModalAddressIndex(null);

  const hasAddressErrors = (index?: number) => {
    let error = errors.address;
    if (index !== undefined) {
      error = errors.addresses?.[index];
    }
    return !!(error?.streetName ?? error?.city ?? error?.postalCode ?? error?.country);
  };

  const {
    handleCustomerUpdate,
    handleSaveAddress,
    handleAddNewAddress,
    handleRemoveAddress,
    handleSetDefaultShippingAddress,
    handleSetDefaultBillingAddress,
    handleUserFormSubmit,
  } = useUserFormHandlers(customer, fetchCustomer, getValues, setError);

  const onSubmit = async () => {
    const formData = getValues();
    const updateActions = handleUserFormSubmit(formData);
    if (updateActions.length > 0) {
      await handleCustomerUpdate(updateActions, UserUpdateMessages.UPDATE);
      setIsEditUserMode((prev) => !prev);
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
          <NavLink className={styles.link} to="/password">
            <Button type="button" size="x-small">
              Change Password
            </Button>
          </NavLink>
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
          <Button
            size="x-small"
            onClick={() => {
              setIsAddAddressModalOpen(true);
              resetField('address', {
                defaultValue: {
                  streetName: '',
                  city: '',
                  postalCode: '',
                  country: 'select',
                },
              });
            }}
          >
            Add New Address
          </Button>
        </div>

        <AddressModal
          isOpen={isAddAddressModalOpen}
          onClose={() => setIsAddAddressModalOpen(false)}
          onSave={() => {
            if (newAddress) {
              void handleAddNewAddress(newAddress);
              setIsAddAddressModalOpen(false);
            }
          }}
          hasErrors={hasAddressErrors()}
          title="Add New Address"
          buttonText="Add Address"
        >
          <AddressFormFields prefix="address" errors={errors.address} register={register} />
        </AddressModal>

        <div className={formStyles['input-wrapper-row']}>
          <div className={formStyles['input-wrapper']}>
            {shippingAddress && (
              <Input
                disabled
                value={formatAddress(shippingAddress)}
                id="shipping-address"
                label="Shipping Address"
              ></Input>
            )}
          </div>

          <div className={formStyles['input-wrapper']}>
            {billingAddress && (
              <Input
                disabled
                value={formatAddress(billingAddress)}
                id="billing-address"
                label="Billing Address"
              ></Input>
            )}
          </div>
        </div>

        {userAddresses?.map((address, index) => (
          <div className={styles['address-wrapper']} key={address.id}>
            <div className={styles.address}>
              <Input
                disabled
                label={`Address ${index + 1}`}
                value={formatAddress(customer!.addresses[index])}
                id={`address-${index + 1}`}
              />
              <Button type="button" size="x-small" onClick={() => openModal(index)}>
                Edit
              </Button>
              <Button type="button" size="x-small" onClick={() => void handleRemoveAddress(index)}>
                Delete
              </Button>
            </div>
            <div className={styles.select}>
              <input
                type="radio"
                name="shipping"
                checked={address.id === customer?.defaultShippingAddressId}
                onChange={() => address.id && void handleSetDefaultShippingAddress(address.id)}
              />
              Use as default for shipping
              <input
                type="radio"
                name="billing"
                checked={address.id === customer?.defaultBillingAddressId}
                onChange={() => address.id && void handleSetDefaultBillingAddress(address.id)}
              />
              Use as default for billing
            </div>

            <AddressModal
              isOpen={modalAddressIndex === index}
              onClose={closeModal}
              onSave={() => {
                void handleSaveAddress(index, address);
                closeModal();
              }}
              hasErrors={hasAddressErrors(index)}
            >
              <AddressFormFields prefix={`addresses.${index}`} errors={errors.addresses?.[index]} register={register} />
            </AddressModal>
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
