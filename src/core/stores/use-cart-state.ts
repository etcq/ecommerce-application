import { create } from 'zustand';
import { Cart, DiscountCodeInfo } from '@commercetools/platform-sdk';
import { LocalStorageKeys } from '@/constants/constants';
import { getActiveCart } from '@/core/api/cart/get-active-cart.ts';
import { addDiscountCode } from '@/core/api/cart/add-discount-code.ts';
import { removeDiscountCode } from '@/core/api/cart/remove-discount.ts';

interface LineItem {
  lineItemId: string;
  productId: string;
  quantity: number;
}

interface ICartStore {
  currentCart: Cart | null;
  anonymousCartId: string;
  anonymousId?: string;
  productId: string;
  cartVersion: number | null;

  lineItems: LineItem[];

  setCart: (cart: Cart) => void;
  clearCart: () => void;

  setAnonymousCartId: (anonymousCartId: string) => void;
  setAnonymousId: (anonymousId?: string) => void;
  setProductId: (productId: string) => void;
  setCartVersion: (version: number | null) => void;
  setLineItems: (items: LineItem[]) => void;
  updateLineItemQuantity: (lineItemId: string, quantity: number) => void;
  applyDiscountCode: (code: string) => Promise<Cart>;
}

export const useCartStore = create<ICartStore>((set) => ({
  currentCart: null,
  anonymousCartId: '',
  anonymousId: undefined,
  productId: '',
  cartVersion: null,
  lineItems: [],

  setCart: (cart: Cart): void => {
    localStorage.setItem(LocalStorageKeys.CART_ID, cart.id);
    localStorage.setItem(LocalStorageKeys.CART_VERSION, cart.version.toString());
    localStorage.removeItem(LocalStorageKeys.ANONYMOUS_CART_ID);
    localStorage.removeItem(LocalStorageKeys.ANONYMOUS_ID);
    set({ currentCart: cart, cartVersion: cart.version });
  },
  clearCart: () => {
    localStorage.removeItem(LocalStorageKeys.CART_ID);
    localStorage.removeItem(LocalStorageKeys.CART_VERSION);
    localStorage.removeItem(LocalStorageKeys.ANONYMOUS_CART_ID);
    localStorage.removeItem(LocalStorageKeys.ANONYMOUS_ID);
    set({
      currentCart: null,
      cartVersion: null,
      anonymousCartId: '',
      anonymousId: undefined,
      productId: '',
      lineItems: [],
    });
  },

  setAnonymousCartId: (anonymousCartId: string): void => {
    localStorage.setItem(LocalStorageKeys.ANONYMOUS_CART_ID, anonymousCartId);
    set({ anonymousCartId });
  },
  setAnonymousId: (anonymousId?: string): void => {
    if (anonymousId) {
      localStorage.setItem(LocalStorageKeys.ANONYMOUS_ID, anonymousId);
      set({ anonymousId });
    } else {
      localStorage.removeItem(LocalStorageKeys.ANONYMOUS_ID);
    }
  },
  setCartVersion: (cartVersion: number | null): void => {
    if (cartVersion) {
      localStorage.setItem(LocalStorageKeys.CART_VERSION, cartVersion.toString());
      set({ cartVersion });
    } else {
      localStorage.removeItem(LocalStorageKeys.CART_VERSION);
    }
  },
  setProductId: (productId: string): void => {
    set({ productId });
  },
  setLineItems: (items: LineItem[]): void => set({ lineItems: items }),
  applyDiscountCode: async (code: string): Promise<Cart> => {
    const cart: Cart | null = await getActiveCart();
    if (!cart) {
      throw new Error('No cart found');
    }

    let version: number = cart.version;
    const cartId: string = cart.id;

    const existingCode: DiscountCodeInfo = cart.discountCodes?.[0];
    if (existingCode) {
      const updatedCart: Cart = await removeDiscountCode(cartId, version, existingCode.discountCode.id);
      version = updatedCart.version;
    }

    const resultCart: Cart = await addDiscountCode(cartId, version, code);
    localStorage.setItem(LocalStorageKeys.CART_VERSION, resultCart.version.toString());

    // Обновим в store
    set({
      currentCart: resultCart,
      cartVersion: resultCart.version,
    });

    return resultCart;
  },
  updateLineItemQuantity: (lineItemId: string, quantity: number): void =>
    set((state: ICartStore) => ({
      lineItems: state.lineItems.map((item) => (item.lineItemId === lineItemId ? { ...item, quantity } : item)),
    })),
}));
