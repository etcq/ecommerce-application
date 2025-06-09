import { JSX } from 'react';
import styles from './category-section.module.scss';

const categories = ['man', 'woman', 'running', 'casual'];
export default function CategorySection(): JSX.Element {
  return (
    <section className={styles.categories}>
      <h3>Shop by category</h3>
      <div className={styles.categories__list}>
        {categories.map((category) => (
          <div
            className={styles['categories__list-item']}
            key={category}
            style={{ backgroundImage: `url(/categories/${category}.webp)` }}
          >
            <h4>{category}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
