import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router';
import RegistrationForm from '@/components/form/registration/Registration';

describe('Registration component', () => {
  it('renders form elements', () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>,
    );
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();

    expect(screen.getByLabelText('Street', { selector: '#address-street' })).toBeInTheDocument();
    expect(screen.getByLabelText('City', { selector: '#address-city' })).toBeInTheDocument();
    expect(screen.getByLabelText('Postal Code', { selector: '#address-zip' })).toBeInTheDocument();
    expect(screen.getByLabelText('Country', { selector: '#address-country' })).toBeInTheDocument();

    expect(screen.getByLabelText('Street', { selector: '#billing-street' })).toBeInTheDocument();
    expect(screen.getByLabelText('City', { selector: '#billing-city' })).toBeInTheDocument();
    expect(screen.getByLabelText('Postal Code', { selector: '#billing-zip' })).toBeInTheDocument();
    expect(screen.getByLabelText('Country', { selector: '#billing-country' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toHaveAttribute('href', '/login');
  });

  it('displays error for invalid email', async () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>,
    );

    const email = screen.getByLabelText('Email');
    fireEvent.change(email, { target: { value: 'invalid-email' } });

    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('displays error for invalid postal code', async () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>,
    );

    const zip = screen.getByLabelText('Postal Code', { selector: '#address-zip' });
    fireEvent.change(zip, { target: { value: 'abcde' } });

    expect(await screen.findByText('Invalid postal code')).toBeInTheDocument();
  });

  it('displays error for password length less than 8 characters long', async () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>,
    );

    const password = screen.getByLabelText('Password');
    fireEvent.change(password, { target: { value: 'abcde' } });

    expect(await screen.findByText('Password must be at least 8 characters long.')).toBeInTheDocument();
  });

  it('displays error for password field does not contain at least one uppercase letter', async () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>,
    );

    const password = screen.getByLabelText('Password');
    fireEvent.change(password, { target: { value: 'qwertyuiop' } });

    expect(await screen.findByText('Password must contain at least one uppercase letter.')).toBeInTheDocument();
  });

  it('displays error for first name field contain spaces', async () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>,
    );

    const firstName = screen.getByLabelText('Password');
    fireEvent.change(firstName, { target: { value: 'first name' } });

    expect(await screen.findByText('Field must not contain spaces.')).toBeInTheDocument();
  });
});
