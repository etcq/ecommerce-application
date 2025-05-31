import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router';
import NotFoundPage from '@/pages/not-found/NotFoundPage';

describe('Not found component', () => {
  it('renders not found image and header', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );
    expect(screen.getByAltText('Sad sneaker')).toBeInTheDocument();
    expect(screen.getByText('Error 404')).toBeInTheDocument();
  });
});
