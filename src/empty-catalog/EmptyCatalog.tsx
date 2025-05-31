import { JSX } from 'react';
import styles from './empty-catalog.module.scss';
import img from '@assets/images/empty-catalog/empty-catalog-sneaker.png';

export default function EmptyCatalog(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <img src={img} alt="empty-catalog" />
      <h2 className={styles.title}>No Products Available</h2>
      <p>Please check back later or try searching for different products.</p>
    </div>
  );
}
