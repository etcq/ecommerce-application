import { JSX } from 'react';
import styles from './category-section.module.scss';
import { ROUTES } from '@/constants/constants.ts';
import { useCategoryNavigationStore } from '@/core/stores/use-category-navigation.ts';
import { useNavigate } from 'react-router';
import scrollToTop from '@/core/utils/scrollToTop.ts';

export default function CategorySection(): JSX.Element {
  const navigate = useNavigate();
  const { setRedirectInToMainPage } = useCategoryNavigationStore();
  const rootCategories = ['Man', 'Woman'];
  const footwearCategories = ['running', 'casual'];

  return (
    <section className={styles.categories}>
      <h3>Shop by category</h3>
      <div className={styles.categories__list}>
        {rootCategories.map((category) => (
          <div
            className={styles['categories__list-item']}
            key={category}
            onClick={() => {
              setRedirectInToMainPage(category);
              void navigate(ROUTES.PRODUCT_LIST);
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
              scrollToTop();
              setRedirectInToMainPage(category);
              void navigate(ROUTES.PRODUCT_LIST);
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
