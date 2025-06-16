import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { IProductInfoForDetailedPage } from '@/interfaces/interfaces.ts';
import imgPath from '@assets/images/not-found/not-found.png';
import getAttributeValue from '@/core/utils/get-attributes.ts';

export default function getInfoForDetailedPage(item: ProductProjection): IProductInfoForDetailedPage {
  const images = item.masterVariant.images;
  const prices = item.masterVariant.prices;
  const { colors, sizes } = getAttributeValue(item.variants);
  const allVariants: ProductVariant[] = [item.masterVariant, ...item.variants];
  return {
    id: item.id,
    name: item.name.en,
    img: images && images.length > 0 ? images[0].url : imgPath,
    images: images ? images.map((image) => image.url) : [imgPath],
    description: item.description ? item.description['en-US'] : undefined,
    prices: prices
      ? {
          main: prices[0].value.centAmount,
          discount: prices[0].discounted?.value.centAmount,
        }
      : { main: 0 },
    colors,
    sizes,
    variants: allVariants,
    productInfo: item,
    masterVariant: item.masterVariant,
  };
}
