import styles from './product-card.module.scss';

interface IProductCardProps {
  name: string;
  img: string;
  price: string;
}

export default function ProductCard(props: IProductCardProps): React.JSX.Element {
  return (
    <div className={styles.product}>
      <div className={styles.product__preview} />
      <div className={styles.product__decryption}>
        <h4 className={styles.product__name}>{props.name}</h4>
        <span className={styles.price}>{props.price}</span>
      </div>
    </div>
  );
}
