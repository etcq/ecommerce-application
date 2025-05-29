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
              <div className={styles.icon} onClick={() => openModal(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                  <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                </svg>
              </div>
              <div className={styles.icon} onClick={() => void handleRemoveAddress(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                  <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/>
                </svg>
              </div>
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
