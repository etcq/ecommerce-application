import React from 'react';
import styles from './registration-form.module.scss';
import Input from '../input/Input';
import Button from '@/components/button/Button';
import inputStyles from '../../../components/form/input/input.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { TFormFields, userFormSchema } from './validation-scheme';
import { NavLink } from 'react-router';
import { useEffect, useState, ChangeEvent } from 'react';
import { createAddresses } from '@/core/utils/create-addresses.ts';
import { createCustomerDraft } from '@/core/utils/create-customer-draft.ts';
import { registerCustomer } from '@/core/api/customers/registration.ts';
import { useAuthStore } from '@/core/stores/use-auth-state.ts';
import { CustomerSignInResult } from '@commercetools/platform-sdk';

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TFormFields>({
    resolver: zodResolver(userFormSchema),
    mode: 'onChange',
  });

  const { login } = useAuthStore();
  const [error, setError] = React.useState<string | null>(null);
  const [useAsDefaultBilling, setUseAsDefaultBilling] = useState(false);
  const [useAsDefaultShipping, setUseAsDefaultShipping] = useState(false);
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(false);

  const address = useWatch({ control, name: 'address' });

  useEffect(() => {
    if (useShippingAsBilling && address) {
      setValue('billing.street', address.street);
      setValue('billing.city', address.city);
      setValue('billing.zip', address.zip);
      setValue('billing.country', address.country);
    }
  }, [address, useShippingAsBilling, setValue]);

  const onSubmit = async (data: TFormFields): Promise<void> => {
    setError(null);

    const createdAddresses = createAddresses(data, useShippingAsBilling);
    const customerData = createCustomerDraft(data, createdAddresses, useAsDefaultBilling, useAsDefaultShipping);

    try {
      const customer: CustomerSignInResult = await registerCustomer(customerData);
      if (customer) {
        await login(data.email, data.password);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className={styles['registration-form']}>
      <div className={styles.title}>
        <h1 className={styles['title-header']}>Sign Up</h1>
        <p className={styles['title-subheader']}>
          Already Have An Account,
          <NavLink className={styles['title-link']} to="/login">
            Login
          </NavLink>
          .
        </p>
      </div>

      <form className={styles.form} onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <div className={styles['input-wrapper-row']}>
          <div className={styles['input-wrapper']}>
            <Input
              {...register('firstName')}
              id="first-name"
              label="First Name"
              placeholder="John"
              error={errors.firstName?.message}
            ></Input>
          </div>

          <div className={styles['input-wrapper']}>
            <Input
              {...register('lastName')}
              id="last-name"
              label="Last Name"
              placeholder="Doe"
              error={errors.lastName?.message}
            ></Input>
          </div>
        </div>

        <div className={styles['input-wrapper-row']}>
          <div className={styles['input-wrapper']}>
            <Input
              {...register('email')}
              id="email"
              label="Email"
              placeholder="johndoe@email.com"
              error={errors.email?.message}
            ></Input>
          </div>

          <div className={styles['input-wrapper']}>
            <Input
              {...register('password')}
              id="password"
              label="Password"
              type={'password'}
              placeholder="********"
              error={errors.password?.message}
            ></Input>
          </div>
        </div>

        <div className={`${styles['input-wrapper-row']} ${styles.date}`}>
          <div className={styles['input-wrapper']}>
            <Input
              {...register('dateOfBirth')}
              id="date-of-birth"
              label="Date of Birth"
              type="date"
              placeholder="mm/dd/yyyy"
              error={errors.dateOfBirth?.message}
            ></Input>
          </div>
        </div>

        <p className={styles.address}>Address Information</p>

        <div className={styles['input-wrapper-row']}>
          <div className={styles['input-wrapper']}>
            <Input
              {...register('address.street')}
              id="address-street"
              label="Street"
              placeholder="123 Maple Street"
              error={errors.address?.street?.message}
            ></Input>
          </div>

          <div className={styles['input-wrapper']}>
            <Input
              {...register('address.city')}
              id="address-city"
              label="City"
              placeholder="Anytown"
              error={errors.address?.city?.message}
            ></Input>
          </div>
        </div>

        <div className={styles['input-wrapper-row']}>
          <div className={styles['input-wrapper']}>
            <Input
              maxLength={5}
              {...register('address.zip')}
              id="address-zip"
              label="Postal Code"
              placeholder="12345"
              error={errors.address?.zip?.message}
            ></Input>
          </div>

          <div className={styles['input-wrapper']}>
            <label htmlFor="address-country">Country</label>
            <select
              {...register('address.country')}
              className={inputStyles.input}
              id="address-country"
              defaultValue="select"
            >
              <option value="select" disabled>
                Select Country
              </option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
            </select>
            <div className={styles['input-error']}>{errors.address?.country?.message}</div>
          </div>
        </div>

        <span className={styles.shipping}>
          <span className={styles['shipping-label']}>Use as default for shipping</span>
          <input
            type="checkbox"
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setUseAsDefaultShipping(e.target.checked)}
          />
        </span>

        <span className={styles.shipping}>
          <span className={styles['shipping-label']}>Use shipping address as billing</span>
          <input
            type="checkbox"
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setUseShippingAsBilling(e.target.checked)}
          />
        </span>

        {!useShippingAsBilling && (
          <>
            <p className={styles.address}>Billing Address</p>

            <div className={styles['input-wrapper-row']}>
              <div className={styles['input-wrapper']}>
                <Input
                  {...register('billing.street')}
                  id="billing-street"
                  label="Street"
                  placeholder="123 Maple Street"
                  error={errors.billing?.street?.message}
                ></Input>
              </div>

              <div className={styles['input-wrapper']}>
                <Input
                  {...register('billing.city')}
                  id="billing-city"
                  label="City"
                  placeholder="Anytown"
                  error={errors.billing?.city?.message}
                ></Input>
              </div>
            </div>

            <div className={styles['input-wrapper-row']}>
              <div className={styles['input-wrapper']}>
                <Input
                  maxLength={5}
                  {...register('billing.zip')}
                  id="billing-zip"
                  label="Postal Code"
                  placeholder="12345"
                  error={errors.billing?.zip?.message}
                ></Input>
              </div>

              <div className={styles['input-wrapper']}>
                <label htmlFor="billing-country">Country</label>
                <select
                  {...register('billing.country')}
                  className={inputStyles.input}
                  id="billing-country"
                  defaultValue="select"
                >
                  <option value="select" disabled>
                    Select Country
                  </option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                </select>
                <span className={styles['input-error']}>{errors.billing?.country?.message}</span>
              </div>
            </div>

            <span className={styles.shipping}>
              <span className={styles['shipping-label']}>Use as default for billing</span>
              <input
                type="checkbox"
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setUseAsDefaultBilling(e.target.checked)}
              />
            </span>
          </>
        )}
        <span className={styles.error}>{error}</span>
        <Button className={styles.submit} disabled={isSubmitting} type="submit" size="large">
          {isSubmitting ? 'Loading...' : 'Create Account'}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
