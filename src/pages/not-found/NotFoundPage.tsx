import Button from '@/components/button/Button';
import { JSX } from 'react';
import imgPath from '@assets/images/not-found/not-found.png';
import styles from './notFound.module.scss';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/constants/constants';

export default function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className={styles['not-found']}>
      <img src={imgPath} className={styles['not-found_img']} alt="Sad sneaker" />
      <div className={styles['not-found_description']}>
        <h2 className={styles.title}>Error 404</h2>
        <h2 className={styles.title}>Page is not found</h2>
        <p>We can't find the page you were looking for.</p>
        <Button
          type="button"
          size="large"
          children="Back to main page"
          onClick={() => {
            void navigate(ROUTES.MAIN);
          }}
        />
      </div>
    </div>
  );
}
