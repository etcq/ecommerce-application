import styles from './item.module.scss';
import { Minus, Plus, X } from 'lucide-react';

export interface IItemProps {
  image: string;
  name: string;
  price: number;
  quantity: number;
  size: number;
  color: string;
}

const Item: React.FC<IItemProps> = ({ image, name, price, quantity, size, color }) => {
  return (
    <div className={styles.item}>
      <div className={styles.delete}>
        <X />
      </div>
      <img className={styles.image} src={image} />
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.size}>Size: {size}</div>
        <div className={styles.color}>Color: {color}</div>
      </div>
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
