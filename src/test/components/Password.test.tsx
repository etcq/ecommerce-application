import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router';
import PasswordForm from '@/components/form/user/password/Password';

describe('Password component', () => {
  it('password form elements', () => {
    render(
      <BrowserRouter>
        <PasswordForm />
      </BrowserRouter>,
    );
    expect(screen.getByLabelText('Current Password')).toBeInTheDocument();
    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  it('displays error when new password and confirmation do not match', async () => {
    render(
      <BrowserRouter>
        <PasswordForm />
      </BrowserRouter>,
    );

    const newPassword = screen.getByLabelText('New Password');
    const newPasswordConfirm = screen.getByLabelText('Confirm New Password');
    fireEvent.change(newPassword, { target: { value: 'Password123' } });
    fireEvent.change(newPasswordConfirm, { target: { value: 'Password1234' } });

    expect(await screen.findByText('Passwords do not match')).toBeInTheDocument();
  });
});
