import { JSX, useEffect } from 'react';
import styles from './promo-section.module.scss';
import promoVideo from '@assets/video/Promo Background.mp4';
import promoImg from '@assets/images/main-page/promo/promo-poster.png';
import { useHeaderState } from '@/core/stores/state-header.ts';
import Button from '@components/button/Button.tsx';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/constants/constants.ts';

export default function PromoSection(): JSX.Element {
  const { setIsDarkTheme } = useHeaderState();
  const navigate = useNavigate();

  useEffect(() => {
    setIsDarkTheme(true);
    return () => {
      setIsDarkTheme(false);
    };
  }, [setIsDarkTheme]);

  return (
    <section className={styles.promo}>
      <div className={styles.promo__bg}>
        <div className={styles['promo__bg-overlay']}></div>
        <video loop muted autoPlay className={styles['promo__bg-video']} poster={promoImg}>
          <source src={promoVideo} />
        </video>
      </div>
      <div className={styles.promo__content}>
        <h1>
          SNEAKHUB <br /> STEP INTO STYLE
        </h1>
        <span>Beauty, convenience and style all in one place</span>
        <Button size={'medium'} className={styles.promo__btn} onClick={() => void navigate(ROUTES.PRODUCT_LIST)}>
          Shop now
        </Button>
      </div>
    </section>
  );
}
