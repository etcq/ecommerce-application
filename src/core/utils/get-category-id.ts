import { Category } from '@commercetools/platform-sdk';
import { LOCALIZATION } from '@/constants/constants.ts';

export default function getCategoryIdByName(name: string, categories: Category[]) {
  const currentCategory: Category | undefined = categories.find(
    (category: Category): boolean => category.name[LOCALIZATION] === name,
  );
  if (!currentCategory) {
    return 'Man';
  }
  return currentCategory.id;
}
