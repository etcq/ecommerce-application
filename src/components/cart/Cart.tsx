import Button from '../button/Button';
import Input from '../form/input/Input';
import styles from './cart.module.scss';
import itemStyles from './item/item.module.scss';
import Item from './item/Item';
import EmptyCart from './empty-cart/EmptyCart';
import { useEffect } from 'react';
import { useCartStore } from '@/core/stores/use-cart-state';
import { removeLineItem } from '@/core/api/cart/remove-product';
import { getActiveCart } from '@/core/api/cart/get-active-cart';

const Cart: React.FC = () => {
  const { setCart, currentCart, setLineItems } = useCartStore.getState();
  const cartVersion = useCartStore((state) => state.cartVersion);
  const cartItems = currentCart?.lineItems;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getActiveCart();
        setCart(cart!);
      } catch (error) {
        console.error('Failed to get cart:', error);
      }
    };

    fetchCart().catch((error) => console.error('Error while fetch cart:', error));
  }, [setCart, setLineItems]);

  const handleClearCart = async () => {
    if (!currentCart) return;
    try {
      let updatedCart = currentCart;
      for (const item of currentCart.lineItems) {
        updatedCart = await removeLineItem(updatedCart.id, updatedCart.version, item.id);
      }
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  return cartItems && cartItems.length > 0 ? (
    <div className={styles.cart}>
      <div className={styles['cart-table']}>
        <div className={styles.header}>
          <div className={styles.product}>Product</div>
          <div className={styles['header-price']}>Price</div>
          <div>Quantity</div>
          <div className={styles['header-price']}>Total</div>
        </div>
        <div className={styles.items}>
          {cartItems.map(({ id, variant, name, price, quantity }) => {
            const attributes = variant.attributes ?? [];
            const size = typeof attributes[3]?.value === 'number' ? attributes[3].value : undefined;
            const color = typeof attributes[2]?.value === 'string' ? attributes[2].value : undefined;
            const image = variant.images?.[0]?.url ?? '';

            return (
              <Item
                key={id}
                id={id}
                image={image}
                name={name.en}
                price={price.value.centAmount / 100}
                quantity={quantity}
                size={size}
                color={color}
                version={cartVersion!}
                cartId={currentCart.id}
              />
            );
          })}
        </div>
      </div>

      {(() => {
        const discount = null;
        const subtotal = cartItems.reduce(
          (total, item) => total + (item.price.value.centAmount * item.quantity) / 100,
          0,
        );
        const calculateDiscount = (discount: number) => Math.round(subtotal * (discount / 100) * 100) / 100;
        const discountValue = discount ? calculateDiscount(discount) : 0;
        const total = subtotal - discountValue;

        return (
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
                <div className={styles['total-price']}>{`$${total.toFixed(2)}`}</div>
              </div>
            </div>

            <div className={styles.promo}>
              <Input placeholder="Promo Code" />
              <Button size="small" children="Apply" />
            </div>

            <Button size="medium" children="Clear Cart" onClick={() => void handleClearCart()} />
          </div>
        );
      })()}
    </div>
  ) : (
    <EmptyCart />
  );
};

export default Cart;
