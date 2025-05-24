import { JSX, useEffect, useState } from 'react';
import { IProductInfoForCard } from '@/interfaces/interfaces.ts';
import ProductCard from '@components/product-card/ProductCard.tsx';
import { getProductsForPage } from '@/core/api/products/get-products-list.ts';
import getInfoForCard from '@/core/utils/get-info-for-card.ts';
import { BASE_LIMIT_PER_PAGE } from '@/constants/constants.ts';
import styles from './product-cards-list.module.scss';
import { useProductListStore } from '@/core/stores/product-list-store.ts';
import ProductListControls from '@components/product-list-controls/ProductListControls.tsx';
import Loading from '@components/loading/Loading.tsx';

export default function ProductCardsList(): JSX.Element {
  const [catalog, setCatalog] = useState<IProductInfoForCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { page, setTotal, setIsProductEnded } = useProductListStore();
  const baseLimit = BASE_LIMIT_PER_PAGE;
  useEffect(() => {
    setIsLoading(true);
    getProductsForPage({ limit: baseLimit, offset: baseLimit * (page - 1) })
      .then((response) => {
        const productArr: IProductInfoForCard[] = [];
        if (response?.results && response.total) {
          setTotal(response.total);
          setIsProductEnded(response.results.length < baseLimit);
          response.results.forEach((product) => {
            productArr.push(getInfoForCard(product));
          });
          setCatalog(productArr);
        }
      })
      .then(() => setIsLoading(false))
      .catch((err) => console.error(err));
  }, [page, baseLimit]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.wrapper}>
            {catalog.map((item: IProductInfoForCard) => (
              <ProductCard {...item} key={item.id} />
            ))}
          </div>
        </>
      )}
      <ProductListControls isLoading={isLoading} />
    </>
  );
}
