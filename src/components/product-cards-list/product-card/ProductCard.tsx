import styles from './product-card.module.scss';
import { IProductInfoForCard } from '@/interfaces/interfaces.ts';
import PriceView from '@components/price-view/PriceView.tsx';
import { JSX } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/constants/constants.ts';
import { createOrUpdateCart } from '@/core/services/create-or-update-cart.ts';
import getInfoForDetailedPage from '@/core/utils/get-info-for-detailed-page.ts';

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
            <svg width="27" height="27" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M.75-.02a.75.75 0 100 1.5l.408-.006 1.606 1.281 1.839 6.881L4.237 12a2 2 0 102.188 2.722l5.705.028a2 2 0 100-1.5l-5.705-.028a2.007 2.007 0 00-.722-.898l.438-2.632 7.933.027 1.91-7.715H4.227L1.683-.026 1.68-.02v-.005L.75-.02z"></path>
            </svg>
          </button>
        </div>
        <div className={styles['product-description']}>{props.description ?? ''}</div>
      </div>
    </div>
  );
}
