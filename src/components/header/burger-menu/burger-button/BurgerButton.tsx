import styles from './burgerButton.module.scss';
import { useHeaderStore } from '@/core/stores/use-header.ts';
interface IBurgerButtonProps {
  open: boolean;
  setOpened: (open: boolean) => void;
}

export default function BurgerButton(props: IBurgerButtonProps): React.JSX.Element {
  const { isDarkTheme } = useHeaderStore();

  return (
    <div className={`${styles.wrapper} ${isDarkTheme ? styles['dark-theme'] : ''}`}>
      <div
        className={`${styles.burger} ${props.open ? styles['burger-open'] : ''}`}
        onClick={() => props.setOpened(!props.open)}
      >
        <div className={`${styles['burger-line']} ${styles['burger-line-top']}`}></div>
        <div className={`${styles['burger-line']} ${styles['burger-line-middle']}`}></div>
        <div className={`${styles['burger-line']} ${styles['burger-line-bottom']}`}></div>
      </div>
    </div>
  );
}
