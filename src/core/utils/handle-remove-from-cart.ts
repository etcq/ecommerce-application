import { CartMessages } from '@/constants/constants';
import { useToastStore } from '@/core/stores/toast.ts';
import { removeLineItem } from '@/core/api/cart/remove-product.ts';
import { Cart } from '@commercetools/platform-sdk';
import { useCartStore } from '../stores/use-cart-state';

interface IRemoveFN {
  cartId: string;
  version: number;
  id: string;
  setCart: (cart: Cart) => void;
}

export default async function handleRemoveFromCart({ cartId, version, id, setCart }: IRemoveFN) {
  try {
    const updatedCart = await removeLineItem(cartId, version, id);
    setCart(updatedCart);
    useCartStore.setState({
      lineItems: updatedCart.lineItems.map((item) => ({
        ...item,
        lineItemId: item.id,
      })),
    });
    useToastStore.getState().setMessage(CartMessages.ITEM_DELETE);
  } catch (error) {
    console.error('Failed to remove item:', error);
  }
}
