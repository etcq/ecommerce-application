import { useState } from 'react';
import styles from './burger-button.module.scss';
import BurgerMenu from '../BurgerMenu';

export default function BurgerButton(): React.JSX.Element {
  const [isOpen, setOpened] = useState(false);

  return (
    <>
      <div className={`${styles.burger} ${isOpen ? styles['burger-open'] : ''}`} onClick={() => setOpened(!isOpen)}>
        <div className={`${styles['burger-line']} ${styles['burger-line-top']}`}></div>
        <div className={`${styles['burger-line']} ${styles['burger-line-middle']}`}></div>
        <div className={`${styles['burger-line']} ${styles['burger-line-bottom']}`}></div>
      </div>
      <BurgerMenu open={isOpen} />
    </>
  );
}
