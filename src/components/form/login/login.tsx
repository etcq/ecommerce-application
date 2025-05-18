import styles from './loginForm.module.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@components/form/input/Input.tsx';
import Button from '@components/button/Button.tsx';
import { useAuthStore } from '@/core/stores/use-auth-state.ts';
import * as React from 'react';
import { loginFormSchema } from '@components/form/login/validation-scheme.ts';
import { FormEvent } from 'react';
import { NavigateFunction, NavLink, useNavigate } from 'react-router';
import { ROUTES } from '@/constants/constants.ts';
import { TLoginFormValues } from '@components/form/login/validation-scheme.ts';

export const LoginForm: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const navigate: NavigateFunction = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  const { login } = useAuthStore();

  const onSubmit = async (data: TLoginFormValues): Promise<void> => {
    setError(null);
    try {
      await login(data.email, data.password);
      void navigate(ROUTES.MAIN);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <h2 className={styles.header}>LOGIN</h2>
      <p className={styles.subheader}>
        Do not have an account,{' '}
        <NavLink className={styles.link} to="/registration">
          create a new one.
        </NavLink>
      </p>

      <form
        noValidate
        className={styles.wrapper}
        onSubmit={(e: FormEvent<HTMLFormElement>): void => {
          e.preventDefault();
          void handleSubmit(onSubmit)();
        }}
      >
        <div className={styles.container}>
          <Input
            {...register('email')}
            label={'Email'}
            id={'login-form__email'}
            placeholder={'johndoe@email.com'}
            error={errors.email?.message}
          />
        </div>
        <div className={styles.container}>
          <div className={styles.inner}>
            <Input
              {...register('password')}
              type={'password'}
              id={'login-form__password'}
              label={'Password'}
              placeholder={'********'}
              error={errors.password?.message}
            />
          </div>
        </div>

        {error && <span className={styles.error}>{error}</span>}

        <Button
          className={styles.button}
          size={'medium'}
          type={'submit'}
          children={'Log In'}
          disabled={isSubmitting}
        ></Button>
      </form>
    </>
  );
};
