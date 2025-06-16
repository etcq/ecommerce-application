import styles from './product-card.module.scss';
import { IProductInfoForCard } from '@/interfaces/interfaces.ts';
import PriceView from '@components/price-view/PriceView.tsx';
import { JSX } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/constants/constants.ts';
import { createOrUpdateCart } from '@/core/services/create-or-update-cart.ts';
import getInfoForDetailedPage from '@/core/utils/get-info-for-detailed-page.ts';
import { FaShoppingBasket } from 'react-icons/fa';

export default function ProductCard(props: IProductInfoForCard): JSX.Element {
  const navigate = useNavigate();
  return (
    <div
      className={styles.product}
      onClick={() => {
        void navigate(`${ROUTES.PRODUCT_LIST}/${props.id}`);
      }}
    >
      <div className={styles.product__preview}>
        <img src={props.img} alt={props.name} />
      </div>
      <div className={styles.product__info}>
        <h4 className={styles.product__name}>{props.name}</h4>
        <div className={styles.product__price}>
          <PriceView prices={props.prices} />
          <button
            className={styles.cart}
            type={'button'}
            onClick={(event) => {
              event.stopPropagation();
              const detailedInfo = getInfoForDetailedPage(props.productInfo);
              void createOrUpdateCart('', '', detailedInfo, props.id);
            }}
          >
            <FaShoppingBasket className={styles.cart} />
          </button>
        </div>
        <div className={styles['product-description']}>{props.description ?? ''}</div>
      </div>
    </div>
  );
}
