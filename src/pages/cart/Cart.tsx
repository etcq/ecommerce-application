import CartComponent from '@/components/cart/Cart';
import styles from './cart.module.scss';

export default function Cart(): React.JSX.Element {
  return (
    <div className={styles.wrapper}>
      <CartComponent />
    </div>
  );
}
