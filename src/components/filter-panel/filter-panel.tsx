import styles from './filterPanel.module.scss';
import * as React from 'react';
import { Filter } from '@components/form/filter/filter.tsx';
import { Checkbox } from '@components/form/checkbox/checkbox.tsx';
import { SortingLabels, PriceFiltersArray, FilterTitle, FilterCheckboxIds } from '@/constants/constants.ts';
import { useProductFilterStore } from '@/core/stores/use-product-filter.ts';
import { useCategoryNavigationStore } from '@/core/stores/use-category-navigation.ts';
import { useBreadcrumbStore } from '@/core/stores/use-breadcrumbs.ts';
import { IPriceRange, TSortOrder } from '@/interfaces/interfaces.ts';
import Button from '@components/button/Button.tsx';
import { CategoriesNavigation } from '@components/filter-panel/categories/categories.tsx';
import { useProductListStore } from '@/core/stores/product-list-store.ts';

export const FilterPanel: React.FC = () => {
  const priceRange: IPriceRange[] = useProductFilterStore((state) => state.priceRanges);
  const { setPage } = useProductListStore();
  const togglePriceRange: (range: IPriceRange) => void = useProductFilterStore((state) => state.togglePriceRange);
  const setSortOrder: (order: TSortOrder) => void = useProductFilterStore((state) => state.setSortOrder);
  const sortOrder: TSortOrder = useProductFilterStore((state) => state.sortOrder);
  const alphabetically: boolean = useProductFilterStore((state) => state.alphabetically);
  const setAlphabetically: (alphabetically: boolean) => void = useProductFilterStore(
    (state) => state.setAlphabetically,
  );
  const setDefault: () => void = useProductFilterStore((state) => state.setDefault);
  const setReset: () => void = useCategoryNavigationStore((state) => state.setReset);
  const resetBreadcrumb: () => void = useBreadcrumbStore((state) => state.resetBreadcrumb);

  const handlePriceRangeFilter = (range: IPriceRange | null) => (): void => {
    if (range) {
      togglePriceRange(range);
      setPage(1);
    }
  };

  const handlePriceSort = (order: TSortOrder) => (): void => {
    setSortOrder(sortOrder === order ? null : order);
  };

  const handleAlphabeticallySort = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAlphabetically(event.target.checked);
  };

  const handleDefaultFilter = (): void => {
    setDefault();
    setReset();
    resetBreadcrumb();
  };

  return (
    <>
      <aside className={styles.wrapper}>
        <div className={styles.filter}>
          <CategoriesNavigation />
        </div>
        <Filter title={FilterTitle.PRICE_RANGE}>
          {PriceFiltersArray.map(({ key, label, range }) => (
            <Checkbox
              key={key}
              id={`range-${key.toLowerCase()}`}
              label={label}
              checked={priceRange.some(
                (selectedRange: IPriceRange): boolean =>
                  selectedRange.min === range.min && selectedRange.max === range.max,
              )}
              onChange={handlePriceRangeFilter(range)}
            />
          ))}
        </Filter>
        <Filter title={FilterTitle.SORT_BY}>
          <Checkbox
            label={SortingLabels.BY_ALPHABET}
            id={FilterCheckboxIds.ALPHABETICAL_SORT}
            checked={alphabetically}
            onChange={handleAlphabeticallySort}
          ></Checkbox>
          <Checkbox
            label={SortingLabels.TO_HIGH}
            id={FilterCheckboxIds.PRICE_ASCENDING_SORT}
            checked={sortOrder === FilterCheckboxIds.PRICE_ASCENDING_SORT}
            onChange={handlePriceSort('ascending')}
          ></Checkbox>{' '}
          <Checkbox
            label={SortingLabels.TO_LOW}
            id={FilterCheckboxIds.PRICE_DESCENDING_SORT}
            checked={sortOrder === FilterCheckboxIds.PRICE_DESCENDING_SORT}
            onChange={handlePriceSort('descending')}
          ></Checkbox>
        </Filter>
        <Button
          type={'button'}
          size={'small'}
          className={styles.button}
          children={'Reset filter'}
          onClick={handleDefaultFilter}
        ></Button>
      </aside>
    </>
  );
};
