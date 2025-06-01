import { Category } from '@commercetools/platform-sdk';

export function collectCategoryIds(categoryId: string, allCategories: Category[]): string[] {
  const ids: string[] = [categoryId];
  const children: Category[] = allCategories.filter(
    (category: Category): boolean => category.parent?.id === categoryId,
  );
  for (const child of children) {
    ids.push(...collectCategoryIds(child.id, allCategories));
  }
  return ids;
}
