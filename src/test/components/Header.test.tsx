import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Header from '../../components/header/Header';
import { BrowserRouter } from 'react-router';

describe('Header component', () => {
  it('renders logo and nav menu', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(screen.getByAltText('SneakHub')).toBeInTheDocument();
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
  it('Check the initial state of the login menu component and the class change when the icon is clicked.', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const button = screen.getByTestId('login-menu-button');
    expect(screen.getByTestId('login-menu')).toHaveClass('close');
    fireEvent.click(button);
    expect(screen.getByTestId('login-menu')).toHaveClass('open');
  });
});
