import { JSX } from 'react';
import { IProductInfoForCard } from '@/interfaces/interfaces.ts';
import styles from './price-view.module.scss';

export default function PriceView(props: Pick<IProductInfoForCard, 'prices'>): JSX.Element {
  const { main, discount } = props.prices;
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price / 100);
  };
  return (
    <div className={styles['price-wrapper']}>
      <div className={`${styles.price} ${discount && styles.discounted}`}>
        {main === 0 ? 'The product is not available' : formatPrice(main)}
      </div>
      <div className={styles.price}>{discount ? formatPrice(discount) : ''}</div>
    </div>
  );
}
