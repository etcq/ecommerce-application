import styles from './categories.module.scss';
import { useEffect } from 'react';
import { Category } from '@commercetools/platform-sdk';
import { LOCALIZATION } from '@/constants/constants.ts';
import { getCategories } from '@/core/api/products/get-categories.ts';
import { useCategoryNavigationStore } from '@/core/stores/use-category-navigation.ts';
import { useBreadcrumbStore } from '@/core/stores/use-breadcrumbs.ts';
import { CATEGORY_MESSAGE } from '@/constants/constants.ts';
import { IBreadcrumbItem } from '@/interfaces/interfaces.ts';

export function CategoriesNavigation() {
  const { breadcrumb, setBreadcrumb } = useBreadcrumbStore();
  const {
    allCategories,
    setAllCategories,
    setActiveRootCategoryId,
    selectedFootwearCategoryId,
    setSelectedFootwearId,
    footwearCategories,
    setFootwearCategories,
    brandCategories,
    setBrandCategories,
    setReset,
  } = useCategoryNavigationStore();

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      const categories: Category[] = await getCategories();
      if (categories) {
        setAllCategories(categories);
      } else {
        setReset();
      }
    };
    void fetchCategories();
  }, [setReset, setAllCategories]);

  const handleRootCategoryClick = (name: string): void => {
    const rootCategory: Category | undefined = allCategories.find(
      (category: Category): boolean => category.name[LOCALIZATION] === name,
    );
    if (!rootCategory) return;

    if (selectedFootwearCategoryId === rootCategory.id) {
      setSelectedFootwearId(null);
      setFootwearCategories([]);
      setBrandCategories([]);
      setBreadcrumb([]);
      return;
    }

    setActiveRootCategoryId(rootCategory.id);
    setBreadcrumb([{ id: rootCategory.id, name: rootCategory.name[LOCALIZATION] }]);
    setSelectedFootwearId(rootCategory.id);

    const children: Category[] = allCategories.filter((category): boolean => category.parent?.id === rootCategory.id);
    setFootwearCategories(children);
    setBrandCategories([]);
  };

  const handleCategoryClick = (categoryId: string): void => {
    if (selectedFootwearCategoryId === categoryId) {
      setSelectedFootwearId(null);
      setBrandCategories([]);
      return;
    }
    const selectedCategory: Category | undefined = allCategories.find((cat): boolean => cat.id === categoryId);
    if (!selectedCategory) return;

    const parentId: string | null = selectedCategory.parent?.id ?? null;
    const existingIndex: number = breadcrumb.findIndex((item): boolean => item.id === parentId);
    let updatedBreadcrumb: IBreadcrumbItem[] = [...breadcrumb];

    if (existingIndex !== -1) {
      updatedBreadcrumb = breadcrumb.slice(0, existingIndex + 1);
    }

    if (!updatedBreadcrumb.some((item: IBreadcrumbItem): boolean => item.id === categoryId)) {
      updatedBreadcrumb.push({ id: selectedCategory.id, name: selectedCategory.name[LOCALIZATION] });
    }

    setBreadcrumb(updatedBreadcrumb);
    setSelectedFootwearId(categoryId);

    const children: Category[] = allCategories.filter(
      (category: Category): boolean => category.parent?.id === categoryId,
    );
    if (children.length > 0) {
      setBrandCategories(children);
    }
  };

  const isBreadcrumbSelected = (id: string): boolean => {
    return breadcrumb.some((item: IBreadcrumbItem): boolean => item.id === id);
  };

  return (
    <>
      <div className={styles.category}>
        {['Man', 'Woman'].map((name: string) => {
          const rootCategory: Category | undefined = allCategories.find(
            (category: Category): boolean => category.name[LOCALIZATION] === name,
          );
          const isSelected: boolean = rootCategory ? isBreadcrumbSelected(rootCategory.id) : false;

          return (
            <div
              key={name}
              className={`${styles.text} ${isSelected ? styles.selected : ''}`}
              onClick={(): void => handleRootCategoryClick(name)}
            >
              {name}
            </div>
          );
        })}
      </div>
      <div className={styles.box}>
        {footwearCategories.length === 0 && (
          <div className={styles.message}>
            <p>{CATEGORY_MESSAGE}</p>
          </div>
        )}
        {footwearCategories.length > 0 && (
          <div className={styles.footwear}>
            <h3>Footwear:</h3>
            <ul className={styles.list}>
              {footwearCategories.map((category: Category) => (
                <li
                  className={`${styles.item} ${isBreadcrumbSelected(category.id) ? styles.selected : ''}`}
                  key={category.id}
                  onClick={(): void => handleCategoryClick(category.id)}
                >
                  {category.name[LOCALIZATION]}
                </li>
              ))}
            </ul>
          </div>
        )}

        {brandCategories.length > 0 && (
          <>
            <h3>Brand:</h3>
            <ul className={styles.list}>
              {brandCategories.map((category: Category) => (
                <li
                  className={`${styles.item} ${isBreadcrumbSelected(category.id) ? styles.selected : ''}`}
                  key={category.id}
                  onClick={(): void => handleCategoryClick(category.id)}
                >
                  {category.name[LOCALIZATION]}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
