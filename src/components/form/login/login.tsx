import styles from './loginForm.module.scss';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@components/form/input/Input.tsx';
import Button from '@components/button/Button.tsx';
import { useAuthStore} from "@/core/stores/use-auth-state.tsx";
import * as React from 'react';
import { loginFormSchema} from "@components/form/login/validation-scheme.tsx";
import { FormEvent } from 'react';
import {NavigateFunction, useNavigate} from 'react-router';
import {ROUTES} from "@/constants/constants.ts";

type TLoginFormValues = z.infer<typeof loginFormSchema>;

export const LoginForm: React.FC = () => {
  const [apiError, setApiError] = React.useState<string | null>(null);
  const navigate : NavigateFunction = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { login } = useAuthStore();
  const goToRegistration = () => {
    navigate(ROUTES.REGISTRATION)
  }

  const onSubmit = async (data: TLoginFormValues): Promise<void> => {
    setApiError(null);
    try {
      await login(data.email.toLowerCase(), data.password);
      void navigate(ROUTES.MAIN);
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message || 'An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      <h2>LOGIN</h2>
      <p>
        Do not have an account, <span className={styles.link} onClick={goToRegistration}> create a new one.</span>
      </p>

      <form
        className={styles.wrapper}
        onSubmit={(e: FormEvent<HTMLFormElement>): void => {
          e.preventDefault();
          void handleSubmit(onSubmit)();
        }}
      >
        <div className={styles.container}>
          <Controller
            name={'email'}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type={'email'}
                label={'Email'}
                id={'login-form__email'}
                placeholder={'email'}
                wrapperClassName={'wrapper'}
              />
            )}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>
        <div className={styles.container}>
          <Controller
            name={'password'}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type={'password'}
                id={'login-form__password'}
                label={'Password'}
                placeholder={'password'}
                wrapperClassName={'wrapper'}
              />
            )}
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

        {apiError && <span className={styles.error}>{apiError}</span>}

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
