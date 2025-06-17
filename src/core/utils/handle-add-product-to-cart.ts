import { addProductToCart } from '@/core/api/cart/add-product.ts';
import { useCartStore } from '@/core/stores/use-cart-state.ts';
import { useToastStore } from '@/core/stores/toast.ts';
import { tokenCache } from '@/core/api/token/token-store.ts';

export const handleAddProductToCart = async (cartId: string, version: number, productId: string, variantId: number) => {
  try {
    const userToken: string | undefined = tokenCache.get().refreshToken;

    const response = await addProductToCart({ cartId, version, productId, variantId, userToken });
    useCartStore.getState().setCartVersion(response.version);
    const lineItems = response.lineItems.map((item) => ({
      lineItemId: item.id,
      sku: item.variant.sku,
      productId: item.productId,
      quantity: item.quantity,
    }));
    if (response) {
      useToastStore.getState().setMessage('Product added to cart successfully');
    }
    useCartStore.getState().setLineItems(lineItems);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
