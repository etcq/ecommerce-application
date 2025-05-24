import { JSX } from 'react';
import { useProductListStore } from '@/core/stores/product-list-store.ts';
import Button from '@components/button/Button.tsx';
import styles from './product-list-controls.module.scss';
import { BASE_LIMIT_PER_PAGE, BASE_WIDTH_PAGE_INDICATOR } from '@/constants/constants.ts';

export default function ProductListControls(props: { isLoading: boolean }): JSX.Element {
  const { isLoading } = props;
  const { page, total, isProductEnded, incPage, decPage, setPage } = useProductListStore();
  const baseGap = 3;
  const getPageCount = (total: number | null, limit: number = BASE_LIMIT_PER_PAGE) => {
    return total ? Math.ceil(total / limit) : 0;
  };
  const getWidthPageElement = (total: number | null, width = BASE_WIDTH_PAGE_INDICATOR) => {
    return total ? width / getPageCount(total) - baseGap : 16;
  };
  const getPageRange = (page: number) => {
    const start = page === 1 ? 1 : BASE_LIMIT_PER_PAGE * (page - 1) + 1;
    const end = isProductEnded && total ? total : start + BASE_LIMIT_PER_PAGE - 1;
    return { start, end };
  };
  return (
    <div className={styles.controls}>
      <span className={styles.controls__title}>
        Showing {getPageRange(page).start} - {getPageRange(page).end} of {total} item(s)
      </span>
      <div className={styles.pagination}>
        <Button
          className={styles.pagination__btn}
          size="x-small"
          disabled={page === 1 || isLoading}
          onClick={() => {
            if (page === 1) return;
            decPage();
          }}
        >
          &lt;
        </Button>
        <div className={styles.pagination__view} style={{ width: `${BASE_WIDTH_PAGE_INDICATOR}px` }}>
          <div
            className={styles['pagination__view-indicator']}
            style={{
              transform: `translateX(${(getWidthPageElement(total) + baseGap) * (page - 1)}px)`,
              width: `${getWidthPageElement(total)}px`,
            }}
          ></div>
          {Array.from({ length: getPageCount(total) }).map((_, index) => (
            <div
              className={styles['pagination__view-item']}
              style={{ width: `${getWidthPageElement(total)}px` }}
              key={`page-${index + 1}`}
              onClick={() => {
                if (index + 1 === page) return;
                setPage(index + 1);
              }}
            ></div>
          ))}
        </div>
        <Button
          size="x-small"
          className={styles.pagination__btn}
          disabled={isProductEnded || isLoading}
          onClick={() => {
            if (isProductEnded) return;
            incPage();
          }}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
}
