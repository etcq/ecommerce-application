import styles from './item.module.scss';
import { Minus, Plus, X } from 'lucide-react';

interface IProps {
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const Item: React.FC<IProps> = ({ image, name, price, quantity }) => {
  return (
    <div className={styles.item}>
      <div className={styles.delete}>
        <X />
      </div>
      <img className={styles.image} src={image} />
      <div className={styles.name}>{name}</div>
      <div className={styles.price}>{`$${price}`}</div>
      <div className={styles['quantity-wrapper']}>
        <div className={styles.minus}>
          <Minus />
        </div>
        <div className={styles.quantity}>{quantity}</div>
        <div className={styles.plus}>
          <Plus />
        </div>
      </div>
      <div className={styles.price}>{`$${price * quantity}`}</div>
    </div>
  );
};

export default Item;
