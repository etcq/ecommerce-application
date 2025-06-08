import Button from '../button/Button';
import Input from '../form/input/Input';
import styles from './cart.module.scss';
import itemStyles from './item/item.module.scss';
import Item, { IItemProps } from './item/Item';
import EmptyCart from './empty-cart/EmptyCart';

const Cart: React.FC = () => {
  const discount = null;
  const cartItems: IItemProps[] = [];

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const calculateDiscount = (discount: number) => Math.round(subtotal * (discount / 100) * 100) / 100;
  const discountValue = discount ? calculateDiscount(discount) : 0;
  const total = subtotal - discountValue;

  return cartItems.length > 0 ? (
    <div className={styles.cart}>
      <div className={styles['cart-table']}>
        <div className={styles.header}>
          <div className={styles.product}>Product</div>
          <div className={styles['header-price']}>Price</div>
          <div>Quantity</div>
          <div className={styles['header-price']}>Total</div>
        </div>
        <div className={styles.items}>
          {cartItems.map((item, index) => (
            <Item
              key={index}
              image={item.image}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              size={item.size}
              color={item.color}
            />
          ))}
        </div>
      </div>

      <div className={styles.total}>
        <div className={styles.table}>
          <div className={styles.header}>Cart Total</div>
          <div className={`${itemStyles.item} ${styles.item}`}>
            <div>SUBTOTAL</div>
            <div>{`$${subtotal.toFixed(2)}`}</div>
          </div>
          <div className={`${itemStyles.item} ${styles.item}`}>
            <div>DISCOUNT</div>
            <div>{discount ? `-$${discountValue.toFixed(2)}` : '---'}</div>
          </div>
          <div className={`${itemStyles.item} ${styles.item}`}>
            <div>TOTAL</div>
            <div className={styles[`total-price`]}>{`$${total.toFixed(2)}`}</div>
          </div>
        </div>

        <div className={styles.promo}>
          <Input placeholder="Promo Code" />
          <Button size="small" children="Apply" />
        </div>

        <Button size="medium" children="Clear Cart" />
      </div>
    </div>
  ) : (
    <EmptyCart />
  );
};

export default Cart;
