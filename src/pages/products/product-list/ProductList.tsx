import styles from './product-list.module.scss';
import { JSX } from 'react';
import ProductCardsList from '@/components/product-cards-list/ProductCardsList';

export default function ProductList(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <ProductCardsList />
    </div>
  );
}
