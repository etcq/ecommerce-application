import styles from './user.module.scss';
import formStyles from '@/components/form/registration/registration-form.module.scss';
import Button from '@/components/button/Button';
import Input from '../input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TFormFields, userFormSchema } from '../registration/validation-scheme';
import { useAuthStore } from '@/core/stores/use-auth-state';
import { Address } from '@commercetools/platform-sdk';

const formatAddress = (address: Address) => {
  return `${address?.streetName}, ${address?.city}, ${address?.postalCode}, ${address?.country}`;
};

const UserForm: React.FC = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm<TFormFields>({
    resolver: zodResolver(userFormSchema),
    mode: 'onChange',
  });

  const { customer } = useAuthStore();

  const shippingAddress = customer?.addresses.find((address) => address.id === customer.defaultShippingAddressId);
  const billingAddress = customer?.addresses.find((address) => address.id === customer.defaultBillingAddressId);
  const userAddresses = customer?.addresses;

  return (
    <div className={styles.form}>
      <div className={formStyles.title}>
        <h1>Account Settings</h1>
      </div>

      <form className={formStyles.form}>
        <div className={styles['header-wrapper']}>
          <h3>User Information</h3>
          <Button type="button" size="x-small">
            Edit
          </Button>
        </div>

        <div className={formStyles['input-wrapper-row']}>
          <div className={formStyles['input-wrapper']}>
            <Input
              disabled
              {...register('firstName')}
              defaultValue={customer?.firstName}
              id="first-name"
              label="First Name"
              placeholder="John"
              error={errors.firstName?.message}
            ></Input>
          </div>

          <div className={formStyles['input-wrapper']}>
            <Input
              disabled
              {...register('lastName')}
              defaultValue={customer?.lastName}
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
              disabled
              {...register('email')}
              defaultValue={customer?.email}
              id="email"
              label="Email"
              placeholder="johndoe@email.com"
              error={errors.email?.message}
            ></Input>
          </div>

          <div className={formStyles['input-wrapper']}>
            <Input
              disabled
              {...register('dateOfBirth')}
              defaultValue={customer?.dateOfBirth}
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
        </div>

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
          <Input
            disabled
            key={address.id}
            label={`Address ${index + 1}`}
            defaultValue={formatAddress(address)}
            id={`address-${index + 1}`}
          ></Input>
        ))}

        <Button className={formStyles.submit} disabled={isSubmitting} type="submit" size="large">
          {isSubmitting ? 'Loading...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
