import { JSX, useEffect } from 'react';
import styles from './category-section.module.scss';
import { getCategories } from '@/core/api/products/get-categories.ts';
import { ROUTES } from '@/constants/constants.ts';
import { useCategoryNavigationStore } from '@/core/stores/use-category-navigation.ts';
import { useNavigate } from 'react-router';

export default function CategorySection(): JSX.Element {
  const navigate = useNavigate();
  const { setAllCategories, setReset, setRedirectInToMainPage } = useCategoryNavigationStore();
  const rootCategories = ['Man', 'Woman'];
  const footwearCategories = ['running', 'casual'];
  useEffect(() => {
    getCategories()
      .then((categories) => {
        if (categories) {
          setAllCategories(categories);
        } else {
          setReset();
        }
      })
      .catch((e: Error) => console.error("can't get categories", e));
  }, [setReset, setAllCategories]);

  return (
    <section className={styles.categories}>
      <h3>Shop by category</h3>
      <div className={styles.categories__list}>
        {rootCategories.map((category) => (
          <div
            className={styles['categories__list-item']}
            key={category}
            onClick={() => {
              void navigate(ROUTES.PRODUCT_LIST);
              setRedirectInToMainPage(category);
            }}
            style={{ backgroundImage: `url(/categories/${category}.webp)` }}
          >
            <h4>{category}</h4>
          </div>
        ))}
        {footwearCategories.map((category) => (
          <div
            className={styles['categories__list-item']}
            key={category}
            onClick={() => {
              void navigate(ROUTES.PRODUCT_LIST);
              setRedirectInToMainPage(category);
            }}
            style={{ backgroundImage: `url(/categories/${category}.webp)` }}
          >
            <h4>{category}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
