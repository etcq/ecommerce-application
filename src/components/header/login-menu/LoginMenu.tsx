import { useNavigate } from 'react-router';
import { useHeaderState } from '@/core/stores/state-header';
import styles from './login-menu.module.scss';
import { useEffect, useRef } from 'react';
import Button from '@/components/button/Button';
import { ROUTES } from '@/constants/constants';
import { useAuthStore } from '@/core/stores/use-auth-state';

export default function LoginMenu(): React.JSX.Element {
  const { isOpen, isBye, toggleStatus, changeByeStatus } = useHeaderState();
  const { isLoggedIn, logout, customer } = useAuthStore();

  const menu: React.RefObject<null | HTMLDivElement> = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isOpen) return;
    const closeMenu = (event: MouseEvent): void => {
      if (menu.current && event.target instanceof Node && !menu.current.contains(event.target)) {
        toggleStatus();
      }
    };
    const timeout = setTimeout(() => {
      document.addEventListener('click', closeMenu);
    }, 0);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', closeMenu);
    };
  }, [isOpen, isBye, toggleStatus]);

  const getNameForTitle = (name: string | undefined): string => {
    if (name === undefined || name.length === 0) return 'Anonymous';
    if (name.length > 10) return `${name.slice(0, 10)}...`;
    return name;
  };

  return (
    <div className={`${styles['login-menu']} ${isOpen ? styles.open : styles.close}`} ref={menu}>
      <div className={styles['login-menu__head']}></div>
      {isBye ? (
        <div className={styles['login-menu__title']}>
          <h3>
            Good Bye <br /> {getNameForTitle(customer?.firstName)}
          </h3>
        </div>
      ) : isLoggedIn ? (
        <>
          <div className={styles['login-menu__title']}>
            <h3>Hello, {getNameForTitle(customer?.firstName)}</h3>
          </div>
          <Button
            size="medium"
            type="button"
            children="Profile"
            onClick={() => {
              toggleStatus();
              void navigate(ROUTES.PROFILE);
            }}
          />
          <Button
            type="button"
            size="medium"
            children="Log Out"
            onClick={() => {
              changeByeStatus();
              setTimeout(() => {
                changeByeStatus();
                void navigate(ROUTES.MAIN);
                logout();
                toggleStatus();
              }, 600);
            }}
          />
        </>
      ) : (
        <>
          <div className={styles['login-menu__title']}>
            <h3>Login please</h3>
          </div>
          <Button
            size="medium"
            children="Log In"
            type="button"
            onClick={() => {
              toggleStatus();
              void navigate(ROUTES.LOGIN);
            }}
          />
          <Button
            size="medium"
            children="Registration"
            type="button"
            onClick={() => {
              toggleStatus();
              void navigate(ROUTES.REGISTRATION);
            }}
          />
        </>
      )}
    </div>
  );
}
