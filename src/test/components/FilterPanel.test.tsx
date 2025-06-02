import { screen, render, fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FilterPanel } from '@components/filter-panel/filter-panel.tsx';
import { BrowserRouter } from 'react-router';

const togglePriceRange = vi.fn();
const setSortOrder = vi.fn();
const setAlphabetically = vi.fn();
const setDefault = vi.fn();

const mockState = {
  priceRanges: [],
  togglePriceRange,
  setSortOrder,
  setAlphabetically,
  setDefault,
  alphabetically: false,
  sortOrder: null,
};

vi.mock('@/core/stores/use-product-filter.ts', () => ({
  __esModule: true,
  useProductFilterStore: (selector: (state: typeof mockState) => unknown) => selector(mockState),
}));

const renderWithRouter = (ui: React.ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>);
const priceRanges = [
  { label: '20$ - 50$', value: { min: 2000, max: 5000 } },
  { label: '50$ - 70$', value: { min: 5000, max: 7000 } },
  { label: '70$ - 100$', value: { min: 7000, max: 10000 } },
  { label: '100$ - 120$', value: { min: 10000, max: 12000 } },
];

const sortCheckboxes = [{ label: /alphabetically/i }, { label: /ascending/i }, { label: /descending/i }];

describe('<FilterPanel />', (): void => {
  beforeEach(() => {
    renderWithRouter(<FilterPanel />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render price range filter', (): void => {
    expect(screen.getByText(/price range/i)).toBeInTheDocument();
  });

  it.each(priceRanges.map(({ label }) => label))('should render price range checkbox: %p', (label): void => {
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it.each(priceRanges)(
    'should call togglePriceRange when a price range checkbox is clicked',
    ({ label, value }): void => {
      const checkbox = screen.getByLabelText(label);
      fireEvent.click(checkbox);
      expect(togglePriceRange).toHaveBeenCalledWith(value);
    },
  );

  it('should render sort by Title', () => {
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
  });

  it.each(sortCheckboxes)('should render sort checkbox with label %p', ({ label }): void => {
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('should render reset filter button', () => {
    expect(screen.getByRole('button', { name: /reset filter/i })).toBeInTheDocument();
  });
});
