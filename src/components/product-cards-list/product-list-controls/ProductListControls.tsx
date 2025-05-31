import { JSX, useEffect, useState, useRef } from 'react';
import { useProductListStore } from '@/core/stores/product-list-store.ts';
import Button from '@components/button/Button.tsx';
import styles from './product-list-controls.module.scss';
import { BASE_PAGINATION_WIDTH } from '@/constants/constants.ts';
import { getPageCount, getPageRange, getWidthPaginationElement } from '@/core/utils/pagination-utilities.ts';

export default function ProductListControls(props: { isLoading: boolean }): JSX.Element {
  const { isLoading } = props;
  const { page, total, isLastPage, incPage, decPage, setPage } = useProductListStore();
  const { start, end } = getPageRange(total, page, isLastPage);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const firstLoad = useRef(true);
  useEffect(() => {
    if (!isLoading && firstLoad.current) {
      firstLoad.current = false;
      setShowLoading(false);
    }
  }, [isLoading]);

  return (
    <div className={styles.controls}>
      <span className={styles.controls__title}>
        Showing {start} - {end} of {total} item(s)
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
        <div className={styles.pagination__view} style={{ width: `${BASE_PAGINATION_WIDTH}%` }}>
          {showLoading && isLoading ? (
            <div className={styles.pagination__loading}></div>
          ) : (
            <>
              <div
                className={styles['pagination__view-indicator']}
                style={{
                  transform: `translateX(calc(${page - 1} * (100% + 3px)))`,
                  width: `${getWidthPaginationElement(total)}`,
                }}
              >
                <div className={styles.cursor}></div>
              </div>
              {Array.from({ length: getPageCount(total) }).map((_, index) => (
                <div
                  className={styles['pagination__view-item']}
                  style={{ width: getWidthPaginationElement(total) }}
                  key={`page-${index + 1}`}
                  onClick={() => {
                    if (index + 1 === page) return;
                    setPage(index + 1);
                  }}
                ></div>
              ))}
            </>
          )}
        </div>
        <Button
          size="x-small"
          className={styles.pagination__btn}
          disabled={isLastPage || isLoading}
          onClick={() => {
            if (isLastPage) return;
            incPage();
          }}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
}
