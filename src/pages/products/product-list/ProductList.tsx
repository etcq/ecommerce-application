import styles from './product-list.module.scss';
import { useState, JSX, useEffect } from 'react';
import { IProductInfoForCard } from '@/interfaces/interfaces.ts';
import ProductCard from '@components/product-card/ProductCard.tsx';
import getProductsList from '@/core/api/products/get-products-list.ts';
import getInfoForCard from '@/core/utils/get-info-for-card.ts';

export default function ProductList(): JSX.Element {
  const [catalog, setCatalog] = useState<IProductInfoForCard[]>([]);
  useEffect(() => {
    getProductsList()
      .then((result) => {
        const productArr: IProductInfoForCard[] = [];
        if (result) {
          result.forEach((product) => {
            productArr.push(getInfoForCard(product));
          });
          setCatalog(productArr);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.wrapper}>
      {catalog.map((item: IProductInfoForCard) => (
        <ProductCard name={item.name} price={item.price} img={item.img} id={item.id} key={item.id} />
      ))}
    </div>
  );
}
