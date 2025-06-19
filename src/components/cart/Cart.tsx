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
import { useToastStore } from '@/core/stores/toast.ts';
import { ChangeEvent, useState } from 'react';
import { CartMessages, LocalStorageKeys } from '@/constants/constants.ts';
import Loading from '../loading/Loading';

const Cart: React.FC = () => {
  const { setCart, currentCart, setLineItems } = useCartStore.getState();
  const [inputDiscountCode, setInputDiscountCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activePromo, setActivePromo] = useState<string | null>(() => {
    return localStorage.getItem('activePromo');
  });
  const [loading, setLoading] = useState(true);
  const [showClearModal, setShowClearModal] = useState(false);
  const cartVersion = useCartStore((state) => state.cartVersion);
  const cartItems = currentCart?.lineItems;
  const totalPrice = currentCart?.totalPrice.centAmount;
  const discountCode = currentCart?.discountCodes;

  useEffect(() => {
    setErrorMessage(null);
    setLoading(true);
    getActiveCart()
      .then((cart) => setCart(cart!))
      .catch((error: Error) => setErrorMessage(error.message ?? 'Failed to get cart'))
      .finally(() => setLoading(false));
  }, [setCart, setLineItems]);

  useEffect(() => {
    if (currentCart && currentCart.lineItems.length === 0 && activePromo && currentCart.discountCodes.length > 0) {
      void useCartStore
        .getState()
        .removeActiveDiscount(currentCart.id, currentCart.version)
        .then(() => {
          setActivePromo(null);
          localStorage.removeItem(LocalStorageKeys.ACTIVE_PROMO);
        })
        .catch((error: Error) => {
          console.error('Failed to remove discount:', error.message);
        });
    }
  }, [currentCart, activePromo]);

  const handleClearCart = async (): Promise<void> => {
    setErrorMessage(null);
    if (!currentCart) return;

    try {
      let updatedCart = currentCart;

      for (const item of currentCart.lineItems) {
        updatedCart = await removeLineItem(updatedCart.id, updatedCart.version, item.id);
      }

      updatedCart = await useCartStore.getState().removeActiveDiscount(updatedCart.id, updatedCart.version);

      useToastStore.getState().setMessage(CartMessages.CART_CLEAR);
      localStorage.removeItem(LocalStorageKeys.ACTIVE_PROMO);
      setActivePromo(null);
      setCart(updatedCart);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Failed to clear cart.');
      }
    }
  };

  const handleAddDiscount = async (): Promise<void> => {
    setErrorMessage(null);
    try {
      await useCartStore.getState().applyDiscountCode(inputDiscountCode);
      setActivePromo(inputDiscountCode);
      localStorage.setItem(LocalStorageKeys.ACTIVE_PROMO, inputDiscountCode);
      setInputDiscountCode('');
      useToastStore.getState().setMessage(CartMessages.DISCOUNT_CODE);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Unexpected error while applying the discount code.');
      }
    }
  };

  const handleInputCode = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputDiscountCode(event.target.value);
    setErrorMessage(null);
  };

  if (loading) {
    return <Loading />;
  }

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
        const subtotal = cartItems.reduce(
          (total, item) => total + (item.price.value.centAmount * item.quantity) / 100,
          0,
        );
        const total = totalPrice! / 100;
        const discount = subtotal - total;

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
                <div>{discount ? `-$${discount.toFixed(2)}` : '---'}</div>
              </div>
              <div className={`${itemStyles.item} ${styles.item}`}>
                <div>TOTAL</div>
                <div className={styles['total-price']}>{`$${total.toFixed(2)}`}</div>
              </div>
            </div>

            {discountCode![0] && <div className={styles['promo-active']}> PROMO CODE: {activePromo}</div>}

            <div className={styles.promo}>
              <Input placeholder="Promo Code" value={inputDiscountCode} onChange={handleInputCode} />
              <Button size="small" children="Apply" onClick={() => void handleAddDiscount()} />
            </div>

            <Button size="medium" children="Clear Cart" onClick={() => setShowClearModal(true)} />
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          </div>
        );
      })()}

      {showClearModal && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <p>Do you want to empty your cart?</p>
            <div className={styles.actions}>
              <Button size="small" children={'Cancel'} onClick={() => setShowClearModal(false)} />
              <Button
                size="small"
                children={'Clear'}
                onClick={() => {
                  setShowClearModal(false);
                  void handleClearCart();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <EmptyCart />
  );
};

export default Cart;
