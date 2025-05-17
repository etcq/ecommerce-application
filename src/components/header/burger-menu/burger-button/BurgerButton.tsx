import styles from './burger-button.module.scss';
import { useHeaderState } from '@/core/stores/state-header';
interface BurgerButtonProps {
  open: boolean;
  setOpened: (open: boolean) => void;
}

export default function BurgerButton(props: BurgerButtonProps): React.JSX.Element {
  const { isDarkTheme } = useHeaderState();

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
