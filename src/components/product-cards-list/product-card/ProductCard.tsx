import styles from './product-card.module.scss';
import { IProductInfoForCard } from '@/interfaces/interfaces.ts';
import PriceView from '@components/price-view/PriceView.tsx';
import { JSX } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/constants/constants.ts';

export default function ProductCard(props: IProductInfoForCard): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className={styles.product}>
      <div className={styles.product__preview}>
        <img src={props.img} alt={props.name} />
      </div>
      <div className={styles.product__info}>
        <h4 className={styles.product__name}>{props.name}</h4>
        <div className={styles.product__price}>
          <PriceView prices={props.prices} />
          <div className={styles['product__price-controls']}>
            <div
              className={styles['product__move-page']}
              onClick={() => {
                void navigate(`${ROUTES.PRODUCT_LIST}/${props.id}`, { state: { props } });
              }}
            >
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                width="12px"
                height="12px"
                viewBox="0 0 45.513 45.512"
              >
                <path
                  d="M44.275,19.739L30.211,5.675c-0.909-0.909-2.275-1.18-3.463-0.687c-1.188,0.493-1.959,1.654-1.956,2.938l0.015,5.903
                  l-21.64,0.054C1.414,13.887-0.004,15.312,0,17.065l0.028,11.522c0.002,0.842,0.338,1.648,0.935,2.242s1.405,0.927,2.247,0.925
                  l21.64-0.054l0.014,5.899c0.004,1.286,0.781,2.442,1.971,2.931c1.189,0.487,2.557,0.21,3.46-0.703L44.29,25.694
                  C45.926,24.043,45.92,21.381,44.275,19.739z"
                />
              </svg>
            </div>
            <div className={styles['product__add-cart']}>
              <svg width="12" height="12" viewBox="0 0 19 20" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.60455 0C12.2845 0 14.4878 2.10591 14.5996 4.77432H14.5735C14.5766 4.85189 14.5617 4.92913 14.5299 5H14.6861C15.9031 5 17.1775 5.84351 17.6884 7.8798L17.744 8.12007L18.5129 14.3147C19.0662 18.2657 16.9046 19.9273 13.9558 19.9977L13.7581 20H5.46814C2.47139 20 0.162154 18.908 0.66989 14.5836L0.704514 14.3147L1.48225 8.12007C1.86575 5.92719 3.15322 5.06225 4.39373 5.00326L4.53132 5H4.6095C4.59631 4.92535 4.59631 4.84898 4.6095 4.77432C4.72133 2.10591 6.9246 0 9.60455 0ZM6.69661 8.32929C6.2085 8.32929 5.81282 8.73655 5.81282 9.23893C5.81282 9.74131 6.2085 10.1486 6.69661 10.1486C7.18471 10.1486 7.5804 9.74131 7.5804 9.23893L7.57351 9.12483C7.51897 8.67631 7.14716 8.32929 6.69661 8.32929ZM12.4854 8.32929C11.9973 8.32929 11.6016 8.73655 11.6016 9.23893C11.6016 9.74131 11.9973 10.1486 12.4854 10.1486C12.9735 10.1486 13.3692 9.74131 13.3692 9.23893C13.3692 8.73655 12.9735 8.32929 12.4854 8.32929ZM9.56536 1.30238C7.64125 1.30238 6.08145 2.85682 6.08145 4.77432C6.09463 4.84898 6.09463 4.92535 6.08145 5H13.0928C13.065 4.92794 13.0502 4.85153 13.0493 4.77432C13.0493 2.85682 11.4895 1.30238 9.56536 1.30238Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className={styles['product-description']}>{props.description ?? ''}</div>
      </div>
    </div>
  );
}
