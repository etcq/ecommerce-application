import { ProductVariant } from '@commercetools/platform-sdk';

interface TAttributes {
  colors: string[];
  sizes: number[];
}

export default function getAttributeValue(variants: ProductVariant[]): TAttributes {
  const colors: string[] = [];
  const sizes: number[] = [];
  variants.forEach((variant) => {
    if (variant.attributes) {
      variant.attributes.forEach((attribute) => {
        if (attribute.name === 'color' && attribute.value && typeof attribute.value === 'string') {
          colors.push(attribute.value);
        } else if (attribute.name === 'size' && attribute.value && typeof attribute.value === 'number') {
          sizes.push(attribute.value);
        }
      });
    }
  });
  return { colors: [...new Set(colors)], sizes: [...new Set(sizes)] };
}
