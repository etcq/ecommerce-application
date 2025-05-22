import styles from './product-card.module.scss';
import { IProductInfoForCard } from '@/interfaces/interfaces.ts';
import PriceView from '@components/price-view/PriceView.tsx';
import { JSX } from 'react';

export default function ProductCard(props: IProductInfoForCard): JSX.Element {
  return (
    <div className={styles.product}>
      <div className={styles.product__preview}>
        <img src={props.img} alt={props.name} />
      </div>
      <div className={styles.product__decryption}>
        <h4 className={styles.product__name}>{props.name}</h4>
        <PriceView prices={props.prices} />
      </div>
    </div>
  );
}
