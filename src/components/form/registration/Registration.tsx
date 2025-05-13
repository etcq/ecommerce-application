import React from 'react';
import styles from './registration-form.module.scss';
import Input from '../input/Input';
import Button from '@/components/button/Button';
import inputStyles from '../../../components/form/input/input.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { TFormFields, userFormSchema } from './validation-scheme';
import { NavLink, useNavigate } from 'react-router';
import { ROUTES } from '@/constants/constants';

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TFormFields>({
    resolver: zodResolver(userFormSchema),
    mode: 'onChange',
  });

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const navigate = useNavigate();

  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = () => {
    setError(null);
    try {
      void navigate(ROUTES.MAIN);
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
            <Input {...register('firstName')} label="First Name" placeholder="John"></Input>
            <div className={styles['input-error']}>{errors.firstName?.message}</div>
          </div>

          <div className={styles['input-wrapper']}>
            <Input {...register('lastName')} label="Last Name" placeholder="Doe"></Input>
            <div className={styles['input-error']}>{errors.lastName?.message}</div>
          </div>
        </div>

        <div className={styles['input-wrapper-row']}>
          <div className={styles['input-wrapper']}>
            <Input {...register('email')} label="Email" type="email" placeholder="johndoe@email.com"></Input>
            <div className={styles['input-error']}>{errors.email?.message}</div>
          </div>

          <div className={styles['input-wrapper']}>
            <Input
              {...register('password')}
              label="Password"
              type={isVisible ? 'text' : 'password'}
              placeholder="********"
            ></Input>
            <span className={styles.eye} onClick={toggleVisibility}>
              {isVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
            <div className={styles['input-error']}>{errors.password?.message}</div>
          </div>
        </div>

        <div className={`${styles['input-wrapper-row']} ${styles.date}`}>
          <div className={styles['input-wrapper']}>
            <Input {...register('dateOfBirth')} label="Date of Birth" type="date" placeholder="mm/dd/yyyy"></Input>
            <div className={styles['input-error']}>{errors.dateOfBirth?.message}</div>
          </div>
        </div>

        <p className={styles.address}>Address Information</p>

        <div className={styles['input-wrapper-row']}>
          <div className={styles['input-wrapper']}>
            <Input {...register('address.street')} label="Street" placeholder="123 Maple Street"></Input>
            <div className={styles['input-error']}>{errors.address?.street?.message}</div>
          </div>

          <div className={styles['input-wrapper']}>
            <Input {...register('address.city')} label="City" placeholder="Anytown"></Input>
            <div className={styles['input-error']}>{errors.address?.city?.message}</div>
          </div>
        </div>

        <div className={styles['input-wrapper-row']}>
          <div className={styles['input-wrapper']}>
            <Input maxLength={5} {...register('address.zip')} label="Postal Code" placeholder="12345"></Input>
            <div className={styles['input-error']}>{errors.address?.zip?.message}</div>
          </div>

          <div className={styles['input-wrapper']}>
            <label htmlFor="country">Country</label>
            <select {...register('address.country')} className={inputStyles.input} id="country" defaultValue="select">
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
          <input type="checkbox" />
        </span>

        <span className={styles.shipping}>
          <span className={styles['shipping-label']}>Use shipping address as billing</span>
          <input type="checkbox" />
        </span>

        <p className={styles.address}>Billing Address</p>

        <div className={styles['input-wrapper-row']}>
          <div className={styles['input-wrapper']}>
            <Input {...register('billing.street')} label="Street" placeholder="123 Maple Street"></Input>
            <div className={styles['input-error']}>{errors.billing?.street?.message}</div>
          </div>

          <div className={styles['input-wrapper']}>
            <Input {...register('billing.city')} label="City" placeholder="Anytown"></Input>
            <div className={styles['input-error']}>{errors.billing?.city?.message}</div>
          </div>
        </div>

        <div className={styles['input-wrapper-row']}>
          <div className={styles['input-wrapper']}>
            <Input maxLength={5} {...register('billing.zip')} label="Postal Code" placeholder="12345"></Input>
            <div className={styles['input-error']}>{errors.billing?.zip?.message}</div>
          </div>

          <div className={styles['input-wrapper']}>
            <label>Country</label>
            <select
              {...register('address.country')}
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
            <div className={styles['input-error']}>{errors.billing?.country?.message}</div>
          </div>
        </div>

        <span className={styles.shipping}>
          <span className={styles['shipping-label']}>Use as default for billing</span>
          <input type="checkbox" />
        </span>

        <Button disabled={isSubmitting || !isValid} type="submit" size="large">
          {isSubmitting ? 'Loading...' : 'Create Account'}
        </Button>
        <div className={styles['input-error']}>{error}</div>
      </form>
    </div>
  );
};

export default RegistrationForm;
