import styles from './productList.module.scss';
import { JSX } from 'react';
import ProductCardsList from '@/components/product-cards-list/ProductCardsList';
import { FilterPanel } from '@components/filter-panel/FilterPanel.tsx';
import { Breadcrumbs } from '@components/breadcrubms/Breadcrumbs.tsx';
import { handleBreadcrumbClick } from '@/core/utils/breadcrumb-handlers.ts';

export default function ProductList(): JSX.Element {
  return (
    <>
      <div className={styles.breadcrumb}>
        <Breadcrumbs onBreadcrumbClick={handleBreadcrumbClick} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.filter}>
          <FilterPanel />
        </div>
        <div className={styles.products}>
          <ProductCardsList />
        </div>
      </div>
    </>
  );
}
