import styles from './registration-page.module.scss';
import inputStyles from '../../../components/form/input/input.module.scss';
import Button from '@/components/button/Button';
import Input from '@/components/form/input/Input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

type TFormFields = z.infer<typeof userFormSchema>;

const minimumAge = 18;

const todayDate = new Date();
const validDate = new Date(todayDate.getFullYear() - minimumAge, todayDate.getMonth(), todayDate.getDate());

const birthDateSchema = z.preprocess(
  (value) => {
    if (typeof value === 'string' || value instanceof Date) {
      const date = new Date(value);
      return isNaN(date.getTime()) ? undefined : date;
    }
  },
  z
    .date()
    .refine((date) => date <= todayDate, {
      message: `Date cannot be in the future`,
    })
    .refine((date) => date <= validDate, {
      message: `You must be at least ${minimumAge} years old`,
    }),
);

const userFormSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: 'Field is required',
    })
    .regex(/^[A-Za-z]+$/, {
      message: 'First name must contain only letters (no special characters or numbers)',
    }),
  lastName: z
    .string()
    .min(1, {
      message: 'Field is required',
    })
    .regex(/^[A-Za-z]+$/, {
      message: 'First name must contain only letters (no special characters or numbers)',
    }),
  email: z.string().email({
    message: 'Enter correct email',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message: 'Password must contain at least one letter in upper and lower case, and at least one number',
    }),
  dateOfBirth: birthDateSchema,

  address: z.object({
    street: z.string().min(1, {
      message: 'Field is required',
    }),
    city: z
      .string()
      .min(1, {
        message: 'Field is required',
      })
      .regex(/^[A-Za-z]+$/, {
        message: 'City must contain only letters (no special characters or numbers)',
      }),
    zip: z.string().regex(/^\d{5}$/, {
      message: 'Invalid postal code',
    }),
    country: z.string(),
  }),
});

function RegistrationPage(): React.JSX.Element {
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

  return (
    <div className="container">
      <div className={styles['registration-form']}>
        <div className={styles.title}>
          <h1 className={styles['title-header']}>Sign Up</h1>
          <p className={styles['title-subheader']}>
            Already Have An Account,
            <a className={styles['title-link']} href="">
              Login
            </a>
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
              <label>Country</label>
              <select
                {...register('address.country')}
                className={inputStyles.input}
                label="Country"
                placeholder="Select Country"
              >
                <option value="">United States</option>
                <option value="">Canada</option>
              </select>
              <div className={styles['input-error']}>{errors.address?.country?.message}</div>
            </div>
          </div>

          <Button disabled={isSubmitting || !isValid} type="submit" size="large">
            {isSubmitting ? 'Loading...' : 'Create Account'}
          </Button>
          <div className={styles['input-error']}>{errors.root?.message}</div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
