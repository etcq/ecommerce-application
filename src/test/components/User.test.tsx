import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router';
import UserForm from '@/components/form/user/User';

const renderWithRouter = (ui: React.ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('User component', () => {
  it('user form elements', () => {
    renderWithRouter(<UserForm />);
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /change password/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add new address/i })).toBeInTheDocument();
  });

  it('toggles edit mode when Edit button is clicked, enabling and disabling form fields', () => {
    renderWithRouter(<UserForm />);
    expect(screen.getByLabelText('First Name')).toBeDisabled();
    expect(screen.getByLabelText('Last Name')).toBeDisabled();
    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByLabelText('Date of Birth')).toBeDisabled();

    const editButton = screen.getByRole('button', { name: 'Edit' });
    fireEvent.click(editButton);
    expect(screen.getByLabelText('First Name')).not.toBeDisabled();
    expect(screen.getByLabelText('Last Name')).not.toBeDisabled();
    expect(screen.getByLabelText('Email')).not.toBeDisabled();
    expect(screen.getByLabelText('Date of Birth')).not.toBeDisabled();
    fireEvent.click(editButton);
    expect(screen.getByLabelText('First Name')).toBeDisabled();
    expect(screen.getByLabelText('Last Name')).toBeDisabled();
    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByLabelText('Date of Birth')).toBeDisabled();
  });

  it('displays address fields and buttons when Add New Address button is clicked', () => {
    renderWithRouter(<UserForm />);

    const newAddressButton = screen.getByRole('button', { name: 'Add New Address' });
    fireEvent.click(newAddressButton);
    expect(screen.getByLabelText('Street', { selector: '#address-street' })).toBeInTheDocument();
    expect(screen.getByLabelText('City', { selector: '#address-city' })).toBeInTheDocument();
    expect(screen.getByLabelText('Postal Code', { selector: '#address-zip' })).toBeInTheDocument();
    expect(screen.getByLabelText('Country', { selector: '#address-country' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add address/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });
});
