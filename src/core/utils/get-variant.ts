import { IProductInfoForDetailedPage } from '@/interfaces/interfaces.ts';
import { ProductVariant } from '@commercetools/platform-sdk';

export const getVariant = (
  productInfo: IProductInfoForDetailedPage | null,
  selectedColor: string,
  selectedSize: string,
): ProductVariant | undefined => {
  const sizeToMatch = selectedSize === '' ? '' : Number(selectedSize);
  return productInfo?.variants.find((variant): boolean => {
    const colorAttr = variant.attributes?.find((a): boolean => a.name === 'color');
    const sizeAttr = variant.attributes?.find((a): boolean => a.name === 'size');

    const color: string = typeof colorAttr?.value === 'string' ? colorAttr.value : '';
    const size: number | null = typeof sizeAttr?.value === 'number' ? sizeAttr.value : null;
    return color === selectedColor && size === sizeToMatch;
  });
};
