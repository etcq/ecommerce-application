import imgPath from '@assets/images/loading/loading-sneaker.png';
import styles from './loading.module.scss';

export default function Loading(): React.JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}>
        <img src={imgPath} className={`${styles.sneaker} ${styles.left}`} alt={'sneakers'}></img>
        <img src={imgPath} className={`${styles.sneaker} ${styles.right}`} alt={'sneakers'}></img>
      </div>
      <span className={styles.text}>Loading...</span>
    </div>
  );
}
