import styles from './filterPanel.module.scss';
import * as React from 'react';
import { Filter } from '@components/form/filter/filter.tsx';
import { Checkbox } from '@components/form/checkbox/checkbox.tsx';
import { FilterPrice } from '@/constants/constants.ts';
import { useProductFilterStore } from '@/core/stores/use-product-filter.ts';
import { useCategoryNavigationStore } from '@/core/stores/use-category-navigation.ts';
import { useBreadcrumbStore } from '@/core/stores/use-breadcrumbs.ts';
import { IPriceRange } from '@/interfaces/interfaces.ts';
import { TSortOrder } from '@/interfaces/interfaces.ts';
import Button from '@components/button/Button.tsx';
import { CategoriesNavigation } from '@components/filter-panel/categories/categories.tsx';

export const FilterPanel: React.FC = () => {
  const priceRange: IPriceRange[] = useProductFilterStore((state) => state.priceRanges);
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
        <Filter title={'Price Range'}>
          <Checkbox
            label={FilterPrice.LOW}
            id={'range-1'}
            checked={priceRange.some((range: IPriceRange): boolean => range.min === 2000 && range.max === 5000)}
            onChange={handlePriceRangeFilter({ min: 2000, max: 5000 })}
          ></Checkbox>
          <Checkbox
            label={FilterPrice.MEDIUM}
            id={'range-2'}
            checked={priceRange.some((range: IPriceRange): boolean => range.min === 5000 && range.max === 7000)}
            onChange={handlePriceRangeFilter({ min: 5000, max: 7000 })}
          ></Checkbox>
          <Checkbox
            label={FilterPrice.HEIGHT}
            id={'range-3'}
            checked={priceRange.some((range: IPriceRange): boolean => range.min === 7000 && range.max === 10000)}
            onChange={handlePriceRangeFilter({ min: 7000, max: 10000 })}
          ></Checkbox>
          <Checkbox
            label={FilterPrice.PREMIUM}
            id={'range-4'}
            checked={priceRange.some((range: IPriceRange): boolean => range.min === 10000 && range.max === 12000)}
            onChange={handlePriceRangeFilter({ min: 10000, max: 12000 })}
          ></Checkbox>
        </Filter>
        <Filter title={'Sort By'}>
          <Checkbox
            label={'alphabetically'}
            id={'price'}
            checked={alphabetically}
            onChange={handleAlphabeticallySort}
          ></Checkbox>
          <Checkbox
            label={'ascending'}
            id={'ascending'}
            checked={sortOrder === 'ascending'}
            onChange={handlePriceSort('ascending')}
          ></Checkbox>{' '}
          <Checkbox
            label={'descending'}
            id={'descending'}
            checked={sortOrder === 'descending'}
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
