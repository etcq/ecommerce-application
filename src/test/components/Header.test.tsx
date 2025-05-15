import { render, screen } from '@testing-library/react';
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
  it('check to login menu must be opened', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('login-menu')).toHaveStyle('visibility: visible');
  });
});
