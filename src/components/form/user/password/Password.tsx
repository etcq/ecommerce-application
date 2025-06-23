import { useForm } from 'react-hook-form';
import Input from '../../input/Input';
import styles from './password.module.scss';
import formStyles from '@components/form/registration/registration.module.scss';
import { passwordFormSchema, TPasswordFormFields } from './validation-scheme';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/button/Button';
import React from 'react';
import { useAuthStore } from '@/core/stores/use-auth.ts';
import { useToastStore } from '@/core/stores/use-toast.ts';
import { NavLink, useNavigate } from 'react-router';
import { ROUTES } from '@/constants/constants';
import { changePassword } from '@/core/api/customers/password';

const PasswordForm: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const { customer, login } = useAuthStore.getState();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TPasswordFormFields>({
    resolver: zodResolver(passwordFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: TPasswordFormFields) => {
    setError(null);
    try {
      await changePassword(data.currentPassword, data.newPassword);
      await login(customer!.email, data.newPassword);
      useToastStore.getState().setMessage('Password was changed successfully!');
      void navigate(ROUTES.PROFILE);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className={styles.form}>
      <div className={formStyles.title}>
        <h1 className={styles.header}>Password Settings</h1>
        <p className={styles['title-subheader']}>
          Change your mind?
          <NavLink className={styles['title-link']} to="/profile">
            Back to Profile
          </NavLink>
          .
        </p>
      </div>

      <form className={formStyles.form} onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <div className={formStyles['input-wrapper-row']}>
          <div className={formStyles['input-wrapper']}>
            <Input
              {...register('currentPassword')}
              type="password"
              id="current-password"
              label="Current Password"
              placeholder="********"
              error={errors.currentPassword?.message}
            />
          </div>
          <div className={formStyles['input-wrapper']}></div>
        </div>

        <div className={formStyles['input-wrapper-row']}>
          <div className={formStyles['input-wrapper']}>
            <Input
              {...register('newPassword')}
              type="password"
              id="new-password"
              label="New Password"
              placeholder="Enter new password..."
              error={errors.newPassword?.message}
            />
          </div>

          <div className={formStyles['input-wrapper']}>
            <Input
              {...register('confirmPassword')}
              type="password"
              id="confirm-password"
              label="Confirm New Password"
              placeholder="Confirm new password..."
              error={errors.confirmPassword?.message}
            />
          </div>
        </div>

        {error && <span className={styles.error}>{error}</span>}

        <Button className={formStyles.submit} disabled={isSubmitting} type="submit" size="large">
          {isSubmitting ? 'Loading...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
};

export default PasswordForm;
