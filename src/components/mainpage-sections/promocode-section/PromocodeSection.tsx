import styles from './promocodeSection.module.scss';
import { JSX, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Pagination } from 'swiper/modules';
import PromocodeSlide from '@components/mainpage-sections/promocode-section/slide/PromocodeSlide';
import { getDiscount } from '@/core/api/discount/get-discount.ts';
import getDiscountsInfo from '@/core/utils/get-discounts-info.ts';
import { IDiscountInfo } from '@/interfaces/interfaces.ts';
import Loading from '@components/loading/Loading.tsx';

export default function PromocodeSection(): JSX.Element {
  const [discounts, setDiscounts] = useState<IDiscountInfo[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDiscount()
      .then((response) => {
        if (response?.results) {
          setDiscounts(response.results.map(getDiscountsInfo));
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.promocode}>
      <h3 className={styles.promocode__header}>Our active promo codes</h3>
      {loading ? (
        <div className={styles.promocode__loading}>
          <Loading />
        </div>
      ) : (
        <Swiper
          className={styles.promocode__slider}
          modules={[Pagination]}
          pagination={{ clickable: true, type: 'bullets' }}
          spaceBetween={1}
          slidesPerView={1}
        >
          {discounts.map(
            (discount) =>
              discount.isActive && (
                <SwiperSlide key={discount.name}>
                  <PromocodeSlide {...discount} />
                </SwiperSlide>
              ),
          )}
        </Swiper>
      )}
    </section>
  );
}
