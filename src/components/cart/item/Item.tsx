import styles from './item.module.scss';
import { Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '@/core/stores/use-cart-state';
import { removeLineItem } from '@/core/api/cart/remove-product';

export interface IItemProps {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  size: number;
  color: string;
  version: number;
  cartId: string;
}

const Item: React.FC<IItemProps> = ({ id, image, name, price, quantity, size, color, version, cartId }) => {
  const setCart = useCartStore((state) => state.setCart);

  const handleRemove = async () => {
    try {
      const updatedCart = await removeLineItem(cartId, version, id);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.delete}>
        <X onClick={() => void handleRemove()} />
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
