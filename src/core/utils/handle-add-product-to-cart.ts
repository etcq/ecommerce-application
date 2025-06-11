import { addProductToCart } from '@/core/api/cart/add-product.ts';
import { useCartStore } from '@/core/stores/use-cart-state.ts';
import { useToastStore } from '@/core/stores/toast.ts';
import { LocalStorageKeys } from '@/constants/constants.ts';

export const handleAddProductToCart = async (cartId: string, version: number, productId: string, variantId: number) => {
  try {
    const userToken = localStorage.getItem(LocalStorageKeys.TOKEN);
    const response = await addProductToCart({ cartId, version, productId, variantId, userToken });
    useCartStore.getState().setCartVersion(response.version);

    const lineItems = response.lineItems.map((item) => ({
      lineItemId: item.id,
      productId: item.productId,
      quantity: item.quantity,
    }));
    if (response) {
      useToastStore.getState().setMessage('added');
    }
    console.log(lineItems);
    useCartStore.getState().setLineItems(lineItems);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
