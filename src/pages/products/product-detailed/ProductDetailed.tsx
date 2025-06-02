import { JSX, useEffect, useState } from 'react';
import styles from './product-detailed.module.scss';
import Button from '@components/button/Button.tsx';
import PriceView from '@components/price-view/PriceView.tsx';
import { useNavigate, useParams } from 'react-router';
import { getCurrentProduct } from '@/core/api/products/get-products-list.ts';
import getInfoForDetailedPage from '@/core/utils/get-info-for-detailed-page.ts';
import { IProductInfoForDetailedPage } from '@/interfaces/interfaces.ts';
import Loading from '@components/loading/Loading.tsx';
import ColorPicker from '@components/color-picker/ColorPicker.tsx';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import deliveryIcon from '@assets/images/product-detailed/delivery-icon.png';
import shippingIcon from '@assets/images/product-detailed/shipping-icon.png';
import 'swiper/swiper-bundle.css';
import EmptyCatalog from '@/empty-catalog/EmptyCatalog.tsx';
import ImageSlider from '@components/slider/Slider.tsx';
import { RiArrowGoBackFill } from 'react-icons/ri';

export default function ProductDetailed(): JSX.Element {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState<IProductInfoForDetailedPage | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
            <ImageSlider slides={productInfo.images} name={productInfo.name} />
          </div>
          <div className={styles.description}>
            <div className={styles.description__header}>
              <h2 className={styles.description__title}>{productInfo.name}</h2>
              <Button size={'x-small'} className={styles['back-btn']} onClick={() => void navigate(-1)}>
                <RiArrowGoBackFill />
              </Button>
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
