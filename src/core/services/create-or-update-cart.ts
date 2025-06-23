import { createAnonymousCart } from '@/core/api/cart/create-anonymous';
import { getActiveCart } from '@/core/api/cart/get-active-cart';
import { createCustomerCart } from '@/core/api/cart/create-customer';
import { handleAddProductToCart } from '@/core/utils/handle-add-product-to-cart.ts';
import { useAuthStore } from '@/core/stores/use-auth.ts';
import { useCartStore } from '@/core/stores/use-cart.ts';
import { LocalStorageKeys } from '@/constants/constants';
import { IProductInfoForDetailedPage } from '@/interfaces/interfaces';
import { Cart, ProductVariant } from '@commercetools/platform-sdk';
import { getVariant } from '@/core/utils/get-variant.ts';

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
    matchedVariant = getVariant(productInfo, selectedColor, selectedSize);
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
