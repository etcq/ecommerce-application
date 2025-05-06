import { useLoginMenu } from '../../../core/state/stateLoginMenu';
import styles from './login-menu.module.scss';
import { useEffect, useRef } from 'react';

export default function LoginMenu(): React.JSX.Element {
  const { isOpen, toggleStatus } = useLoginMenu();

  const menu: React.RefObject<null | HTMLDivElement> = useRef(null);
  useEffect(() => {
    changeClass();
    if (isOpen) {
      const closeMenu = (event: MouseEvent): void => {
        if (menu.current instanceof HTMLDivElement && event.target instanceof Node) {
          if (!menu.current.contains(event.target)) {
            toggleStatus();
          }
        }
      };

      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener('click', closeMenu);
    }
  });

  const changeClass = (): string => {
    return isOpen ? 'open' : 'close';
  };

  return (
    <div className={`${styles['login-menu']} ${styles[changeClass()]}`} ref={menu}>
      <div className={styles['login-menu__head']}></div>
      <div className={styles['login-menu__title']}>
        <h3>Login please</h3>
      </div>
      <button type="button" className="login-menu__login">
        Login
      </button>
      <button type="button" className="login-menu__register">
        Register
      </button>
    </div>
  );
}
