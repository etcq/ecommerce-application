import { JSX, useEffect, useState } from 'react';
import styles from './product-detailed.module.scss';
import Button from '@components/button/Button.tsx';
import PriceView from '@components/price-view/PriceView.tsx';
import { useParams } from 'react-router';
import { getCurrentProduct } from '@/core/api/products/get-products-list.ts';
import getInfoForDetailedPage from '@/core/utils/get-info-for-detailed-page.ts';
import { IProductInfoForDetailedPage } from '@/interfaces/interfaces.ts';
import Loading from '@components/loading/Loading.tsx';
import ColorPicker from '@components/color-picker/ColorPicker.tsx';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import deliveryIcon from '@assets/images/product-detailed/delivery-icon.png';
import shippingIcon from '@assets/images/product-detailed/shipping-icon.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { A11y, Autoplay, Scrollbar, Pagination } from 'swiper/modules';
import EmptyCatalog from '@/empty-catalog/EmptyCatalog.tsx';

export default function ProductDetailed(): JSX.Element {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState<IProductInfoForDetailedPage | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id) {
      getCurrentProduct(id)
        .then((response) => {
          if (!response) {
            console.error('Product not found');
            return;
          }
          setProductInfo(getInfoForDetailedPage(response));
        })
        .catch((error: Error) => {
          console.error(error);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className={styles.wrapper}>
      {loading && productInfo === null ? (
        <Loading />
      ) : productInfo === null ? (
        <EmptyCatalog />
      ) : (
        <>
          <div className={styles.preview}>
            <Swiper
              modules={[Scrollbar, A11y, Autoplay, Pagination]}
              slidesPerView={1}
              spaceBetween={2}
              centeredSlides={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onClick={() => console.log('open modal')}
              className={styles.preview__slide}
            >
              {productInfo.images.map((image) => {
                return (
                  <SwiperSlide key={image}>
                    <img src={image} alt={productInfo.name} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className={styles.description}>
            <div className={styles.description__header}>
              <h2 className={styles.description__title}>{productInfo.name}</h2>
              <PriceView prices={productInfo.prices} className={styles.description__price} />
              <div className={styles.brake}></div>
            </div>
            <p className={styles.description__text}>{productInfo.description}</p>
            <div className={styles['description__buy-parameters']}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 100, textAlign: 'center' }}>
                <InputLabel id="size-label">Size</InputLabel>
                <Select labelId="size-label" defaultValue="">
                  <MenuItem value="">None</MenuItem>
                  {productInfo.sizes.map((size) => (
                    <MenuItem value={size} key={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ColorPicker colors={productInfo.colors} />
            </div>
            <Button size={'large'}>Add to cart</Button>
            <div className={styles.description__benefits}>
              <span className={styles.description__benefits_item}>
                <img src={shippingIcon} alt="Shipping" />
                Free worldwide shipping on all orders over $100
              </span>
              <span className={styles.description__benefits_item}>
                <img src={deliveryIcon} alt="Delivery" />
                Delivers in: 3-7 Working Days
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
