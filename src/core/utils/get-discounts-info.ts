import { IDiscountInfo } from '@/interfaces/interfaces.ts';
import { DiscountCode } from '@commercetools/platform-sdk';
import { LOCALIZATION } from '@/constants/constants.ts';

export default function getDiscountsInfo(discount: DiscountCode): IDiscountInfo {
  return {
    name: discount.name ? discount.name[LOCALIZATION] : 'New promocode',
    description: discount.description ? discount.description[LOCALIZATION] : 'Get your new promocode',
    isActive: discount.isActive,
    code: discount.code,
  };
}
