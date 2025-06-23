import styles from './item.module.scss';
import { Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '@/core/stores/use-cart.ts';
import { changeProductQuantity } from '@/core/api/cart/quantity-product';

import { GiConverseShoe } from 'react-icons/gi';
import handleRemoveFromCart from '@/core/utils/handle-remove-from-cart.ts';

export interface IItemProps {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  size?: number;
  color?: string;
  version: number;
  cartId: string;
}

const Item: React.FC<IItemProps> = ({ id, image, name, price, quantity, size, color, version, cartId }) => {
  const setCart = useCartStore((state) => state.setCart);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity <= 0) return;
    try {
      const updatedCart = await changeProductQuantity({
        cartId,
        version,
        lineItemId: id,
        quantity: newQuantity,
      });
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.delete}>
        <X onClick={() => void handleRemoveFromCart({ cartId, version, id, setCart })} />
      </div>
      {image ? (
        <img className={styles.image} src={image} alt={'product img'} />
      ) : (
        <GiConverseShoe style={{ transform: 'scaleX(-1)' }} className={styles.image} />
      )}
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.size}>Size: {size}</div>
        <div className={styles.color}>Color: {color}</div>
      </div>
      <div className={styles.price}>{`$${price}`}</div>
      <div className={styles['quantity-wrapper']}>
        <div className={styles.minus}>
          <Minus onClick={() => void handleQuantityChange(quantity - 1)} />
        </div>
        <div className={styles.quantity}>{quantity}</div>
        <div className={styles.plus}>
          <Plus onClick={() => void handleQuantityChange(quantity + 1)} />
        </div>
      </div>
      <div className={styles.price}>{`$${price * quantity}`}</div>
    </div>
  );
};

export default Item;
