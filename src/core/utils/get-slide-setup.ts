import { DiscountSliderAlign } from '@/constants/constants.ts';

interface ISlideSetup {
  img: string;
  align: DiscountSliderAlign;
}

const getSlideSetup = (imageVariants: string[]): ISlideSetup => {
  const alignVariants = [DiscountSliderAlign.LEFT, DiscountSliderAlign.RIGHT, DiscountSliderAlign.CENTER];
  return {
    img: imageVariants[Math.floor(Math.random() * imageVariants.length)],
    align: alignVariants[Math.floor(Math.random() * alignVariants.length)],
  };
};

export default getSlideSetup;
