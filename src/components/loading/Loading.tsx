import imgPath from '@assets/images/loading/loading_sneaker.png';
import styles from './loading.module.scss';

export default function Loading(): React.JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}>
        <img src={imgPath} className={styles.left}></img>
        <img src={imgPath} className={styles.right}></img>
      </div>
      <span className={styles.text}>Loading...</span>
    </div>
  );
}
