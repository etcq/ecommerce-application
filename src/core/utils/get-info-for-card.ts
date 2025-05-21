import { ProductProjection } from '@commercetools/platform-sdk';
import { IProductInfoForCard } from '@/interfaces/interfaces.ts';

export default function getInfoForCard(item: ProductProjection) {
  const images = item.masterVariant.images;
  const prices = item.masterVariant.prices;
  const productInfo: IProductInfoForCard = {
    id: item.id,
    name: item.name.en,
    img: images && images.length > 0 ? images[0].url : 'No image',
    price: prices ? prices[0].value.centAmount : 'Not have price',
  };

  return productInfo;
}
