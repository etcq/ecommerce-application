import styles from './product-card.module.scss';
import { IProductInfoForCard } from '@/interfaces/interfaces.ts';

export default function ProductCard(props: IProductInfoForCard): React.JSX.Element {
  return (
    <div className={styles.product}>
      <div className={styles.product__preview}>
        <img src={props.img} alt={props.name} />
      </div>
      <div className={styles.product__decryption}>
        <h4 className={styles.product__name}>{props.name}</h4>
        <span className={styles.price}>${props.price}</span>
      </div>
    </div>
  );
}
