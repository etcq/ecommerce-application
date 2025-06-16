import { createAnonymousCart } from '@/core/api/cart/create-anonymous';
import { getActiveCart } from '@/core/api/cart/get-active-cart';
import { createCustomerCart } from '@/core/api/cart/create-customer';
import { handleAddProductToCart } from '@/core/utils/handle-add-product-to-cart.ts';
import { useAuthStore } from '@/core/stores/use-auth-state';
import { useCartStore } from '@/core/stores/use-cart-state';
import { LocalStorageKeys } from '@/constants/constants';
import { IProductInfoForDetailedPage } from '@/interfaces/interfaces';
import { Cart, ProductVariant } from '@commercetools/platform-sdk';

export const createOrUpdateCart = async (
  selectedSize: string,
  selectedColor: string,
  productInfo: IProductInfoForDetailedPage | null,
  productId: string,
): Promise<void> => {
  const { setAnonymousCartId, setAnonymousId, setCartVersion, setCart, currentCart } = useCartStore.getState();
  const isLoggedIn: boolean = useAuthStore.getState().isLoggedIn;

  let matchedVariant: ProductVariant | undefined;

  if (selectedSize === '' && selectedColor === '') {
    matchedVariant = productInfo?.masterVariant;
  } else {
    const sizeToMatch = selectedSize === '' ? '' : Number(selectedSize);
    matchedVariant = productInfo?.variants.find((variant): boolean => {
      const colorAttr = variant.attributes?.find((a): boolean => a.name === 'color');
      const sizeAttr = variant.attributes?.find((a): boolean => a.name === 'size');

      const color: string = typeof colorAttr?.value === 'string' ? colorAttr.value : '';
      const size: number | null = typeof sizeAttr?.value === 'number' ? sizeAttr.value : null;
      return color === selectedColor && size === sizeToMatch;
    });
  }
  if (!matchedVariant) {
    console.error('No matching variant found for selected color and size');
    return;
  }

  if (!isLoggedIn) {
    const existingCartId: string | null = localStorage.getItem(LocalStorageKeys.ANONYMOUS_CART_ID);
    const existingVersion: string | null = localStorage.getItem(LocalStorageKeys.CART_VERSION);
    const existingAnonymousId: string | null = localStorage.getItem(LocalStorageKeys.ANONYMOUS_ID);

    if (existingCartId && existingVersion) {
      setAnonymousCartId(existingCartId);
      setCartVersion(Number(existingVersion));
      setAnonymousId(existingAnonymousId ?? '');
      await handleAddProductToCart(existingCartId, Number(existingVersion), productId, matchedVariant.id);
      return;
    }

    try {
      const response: Cart = await createAnonymousCart();
      setAnonymousCartId(response.id);
      setCartVersion(response.version);
      setAnonymousId(response.anonymousId);
      await handleAddProductToCart(response.id, response.version, productId, matchedVariant?.id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  } else {
    let cartToUse: Cart | null = currentCart;
    try {
      const activeCart: Cart | null = await getActiveCart();
      if (activeCart) {
        setCart(activeCart);
        localStorage.removeItem(LocalStorageKeys.ANONYMOUS_CART_ID);
        localStorage.removeItem(LocalStorageKeys.ANONYMOUS_ID);
        cartToUse = activeCart;
      } else {
        const response: Cart = await createCustomerCart();
        setCart(response);
        localStorage.removeItem(LocalStorageKeys.ANONYMOUS_CART_ID);
        localStorage.removeItem(LocalStorageKeys.ANONYMOUS_ID);
        cartToUse = response;
      }

      if (cartToUse) {
        await handleAddProductToCart(cartToUse.id, cartToUse.version, productId, matchedVariant?.id);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  }
};
