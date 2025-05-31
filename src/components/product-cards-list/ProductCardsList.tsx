import { JSX, useEffect, useState } from 'react';
import { IProductInfoForCard } from '@/interfaces/interfaces.ts';
import ProductCard from '@components/product-cards-list/product-card/ProductCard.tsx';
import { getProductsForPage } from '@/core/api/products/get-products-list.ts';
import getInfoForCard from '@/core/utils/get-info-for-card.ts';
import { BASE_LIMIT_PER_PAGE, SEARCH_DEBOUNCE_TIME } from '@/constants/constants.ts';
import styles from './product-cards-list.module.scss';
import { useProductListStore } from '@/core/stores/product-list-store.ts';
import ProductListControls from '@components/product-cards-list/product-list-controls/ProductListControls.tsx';
import Loading from '@components/loading/Loading.tsx';
import Input from '@components/form/input/Input.tsx';
import useDebounce from '@/core/hooks/debounce.ts';
import { getPageCount } from '@/core/utils/pagination-utilities.ts';
import EmptyCatalog from '@/empty-catalog/EmptyCatalog.tsx';

export default function ProductCardsList(): JSX.Element {
  const [catalog, setCatalog] = useState<IProductInfoForCard[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { page, total, setTotal, setIsLastPage, resetList } = useProductListStore();
  const debouched = useDebounce(searchText, SEARCH_DEBOUNCE_TIME);
  useEffect(() => {
    setIsLoading(true);
    getProductsForPage({ limit: BASE_LIMIT_PER_PAGE, offset: BASE_LIMIT_PER_PAGE * (page - 1) }, debouched)
      .then((response) => {
        if (response?.results && response.total) {
          setTotal(response.total);
          setIsLastPage(page === getPageCount(total));
          setCatalog(response.results.map(getInfoForCard));
        } else {
          setCatalog([]);
          resetList();
        }
      })
      .catch(() => setTotal(0))
      .finally(() => setIsLoading(false));
  }, [page, total, debouched, resetList, setIsLastPage, setTotal]);
  return (
    <>
      <Input
        type="text"
        id="search"
        placeholder="Search products..."
        value={searchText}
        wrapperClassName={styles.search}
        onChange={(e) => {
          const searchTerm = e.target.value;
          setSearchText(searchTerm);
        }}
        resetFn={() => setSearchText('')}
      />
      <div className={styles.wrapper}>
        {isLoading && catalog && (
          <div className={styles.loading}>
            <Loading />
          </div>
        )}
        {total === 0 && !isLoading ? (
          <EmptyCatalog />
        ) : (
          <>
            {catalog.map((item: IProductInfoForCard) => (
              <ProductCard {...item} key={item.id} />
            ))}
          </>
        )}
      </div>
      <ProductListControls isLoading={isLoading} />
    </>
  );
}
