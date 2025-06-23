import { fireEvent, render, screen } from '@testing-library/react';
import { LoginForm } from '@components/form/login/Login.tsx';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router';
import * as React from 'react';

const renderWithRouter = (ui: React.ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('LoginForm', (): void => {
  it('should render login title', (): void => {
    renderWithRouter(<LoginForm />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('should render login subtitle', async (): Promise<void> => {
    renderWithRouter(<LoginForm />);
    expect(await screen.findByText('Do not have an account,')).toBeInTheDocument();
  });

  it('should render redirect link to registration page', (): void => {
    renderWithRouter(<LoginForm />);
    const link: HTMLElement = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/registration');
  });

  it('should render email and password inputs', (): void => {
    renderWithRouter(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should render submit button', (): void => {
    renderWithRouter(<LoginForm />);
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('should show an error message for invalid email', async (): Promise<void> => {
    renderWithRouter(<LoginForm />);
    const emailInput: HTMLInputElement = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(emailInput).toHaveValue('invalid-email');
    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  const passwordTests: { value: string; error: string }[] = [
    {
      value: 'abcdewer',
      error: 'Password must contain at least one uppercase letter.',
    },
    {
      value: 'Abcde',
      error: 'Password must be at least 8 characters long.',
    },
    {
      value: 'Abcde wer1',
      error: 'Field must not contain spaces.',
    },
  ];

  it.each(passwordTests)(
    'should show error "$error" for password value "$value"',
    async ({ value, error }): Promise<void> => {
      renderWithRouter(<LoginForm />);
      const passwordInput: HTMLInputElement = screen.getByLabelText(/password/i);
      fireEvent.change(passwordInput, { target: { value } });
      expect(await screen.findByText(error)).toBeInTheDocument();
    },
  );
});
