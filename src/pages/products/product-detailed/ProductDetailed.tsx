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
import { createOrUpdateCart } from '@/core/services/create-or-update-cart.ts';
import { useCartStore } from '@/core/stores/use-cart-state.ts';
import { getVariant } from '@/core/utils/get-variant.ts';
import { getActiveCart } from '@/core/api/cart/get-active-cart.ts';
import CartButton from '@components/cartButton/CartButton.tsx';
import handleRemoveFromCart from '@/core/utils/handle-remove-from-cart.ts';

export default function ProductDetailed(): JSX.Element {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState<IProductInfoForDetailedPage | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { productId, setProductId } = useCartStore();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [productInCart, setProductInCart] = useState('');
  const { setCart, currentCart } = useCartStore.getState();
  const cartVersion = useCartStore((state) => state.cartVersion);

  useEffect(() => {
    console.log('effect');
    getActiveCart()
      .then((response) => {
        if (response && selectedColor && selectedSize) {
          const answer = response.lineItems.find(
            (item) => item.variant.sku === getVariant(productInfo, selectedColor, selectedSize)?.sku,
          );
          if (answer) {
            setProductInCart(answer.id);
          } else {
            setProductInCart('');
          }
        }
      })
      .catch((error) => {
        console.error('Error loading cart:', error);
      });
  }, [selectedSize, selectedColor, productInfo]);

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
          setProductId(response.id);
        })
        .catch((error: Error) => {
          console.error(error);
        })
        .finally(() => setLoading(false));
    }
  }, [id, setProductId]);

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
              <PriceView prices={productInfo.prices} className={styles.description__price} />
              <div className={styles.brake}>
                <Button size={'x-small'} className={styles['back-btn']} onClick={() => void navigate(-1)}>
                  <RiArrowGoBackFill />
                </Button>
              </div>
            </div>
            <p className={styles.description__text}>{productInfo.description}</p>
            <div className={styles['description__buy-parameters']}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 100, textAlign: 'center' }}>
                <InputLabel id="size-label">Size</InputLabel>
                <Select labelId="size-label" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                  <MenuItem value="">None</MenuItem>
                  {productInfo.sizes.map((size) => (
                    <MenuItem value={size} key={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ColorPicker
                colors={productInfo.colors}
                selectedColor={selectedColor}
                onChange={(color) => setSelectedColor(color)}
              />
            </div>
            <CartButton
              size={'large'}
              productInCart={productInCart}
              disabled={!selectedSize || !selectedColor}
              addFunction={() => {
                void createOrUpdateCart(selectedSize, selectedColor, productInfo, productId);
                setSelectedSize('');
                setSelectedColor('');
              }}
              removeFunction={() => {
                void handleRemoveFromCart({
                  cartId: currentCart!.id,
                  version: cartVersion!,
                  id: productInCart,
                  setCart,
                });
                setSelectedSize('');
                setSelectedColor('');
              }}
            />
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
