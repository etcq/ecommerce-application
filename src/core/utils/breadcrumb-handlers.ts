import { useCategoryNavigationStore } from '@/core/stores/use-category-navigation.ts';
import { useBreadcrumbStore } from '@/core/stores/use-breadcrumbs.ts';
import { LOCALIZATION } from '@/constants/constants.ts';
import { IBreadcrumbItem } from '@/interfaces/interfaces.ts';
import { Category } from '@commercetools/platform-sdk';

export const handleBreadcrumbClick = (categoryId: string): void => {
  const { breadcrumb, setBreadcrumb } = useBreadcrumbStore.getState();
  const { allCategories, setActiveRootCategoryId, setSelectedFootwearId, setFootwearCategories, setBrandCategories } =
    useCategoryNavigationStore.getState();

  const index: number = breadcrumb.findIndex((item: IBreadcrumbItem): boolean => item.id === categoryId);
  if (index === -1) return;

  const newBreadcrumb: IBreadcrumbItem[] = breadcrumb.slice(0, index + 1);
  setBreadcrumb(newBreadcrumb);

  const lastItem: IBreadcrumbItem | undefined = newBreadcrumb.at(-1);
  if (!lastItem) {
    setActiveRootCategoryId(null);
    setSelectedFootwearId(null);
    setFootwearCategories([]);
    setBrandCategories([]);
    return;
  }

  const clickedCategory: Category | undefined = allCategories.find((cat: Category): boolean => cat.id === lastItem.id);
  if (!clickedCategory) return;

  const isRootCategory: boolean =
    clickedCategory.name[LOCALIZATION] === 'Man' || clickedCategory.name[LOCALIZATION] === 'Woman';

  if (isRootCategory) {
    setSelectedFootwearId(clickedCategory.id);
    setBrandCategories([]);
  } else {
    setSelectedFootwearId(lastItem.id);
    const children: Category[] = allCategories.filter((cat: Category): boolean => cat.parent?.id === lastItem.id);
    setBrandCategories(children);
  }
};
