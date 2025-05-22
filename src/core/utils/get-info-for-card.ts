import { ProductProjection } from '@commercetools/platform-sdk';
import { IProductInfoForCard } from '@/interfaces/interfaces.ts';
import imgPath from '@assets/images/not-found/not-found.png';

export default function getInfoForCard(item: ProductProjection) {
  const images = item.masterVariant.images;
  const prices = item.masterVariant.prices;
  const productInfo: IProductInfoForCard = {
    id: item.id,
    name: item.name.en,
    img: images && images.length > 0 ? images[0].url : imgPath,
    prices: prices
      ? { main: prices[0].value.centAmount, discount: prices[0].discounted?.value.centAmount }
      : { main: 0 },
  };

  return productInfo;
}
