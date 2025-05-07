import { useNavigate } from 'react-router';
import { useLoginMenu } from '../../../core/stores/stateLoginMenu';
import styles from './login-menu.module.scss';
import { useEffect, useRef } from 'react';
import Button from '@/components/button/Button';

export default function LoginMenu(): React.JSX.Element {
  const { isOpen, isLogged, toggleStatus } = useLoginMenu();

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
  }, [isOpen, toggleStatus]);

  return (
    <div className={`${styles['login-menu']} ${isOpen ? styles.open : styles.close}`} ref={menu}>
      <div className={styles['login-menu__head']}></div>
      {isLogged ? (
        <>
          <div className={styles['login-menu__title']}>
            <h3>Hello, User</h3>
          </div>
          <Button
            size="medium"
            type="button"
            children="Profile"
            className="login-menu__login"
            onClick={() => {
              toggleStatus();
              void navigate('/profile');
            }}
          />
          <Button
            type="button"
            size="medium"
            children="Log Out"
            className="login-menu__login"
            onClick={() => {
              toggleStatus();
              void navigate('/');
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
            className="login-menu__login"
            onClick={() => {
              toggleStatus();
              void navigate('/login');
            }}
          />
          <Button
            size="medium"
            children="Registration"
            type="button"
            className="login-menu__register"
            onClick={() => {
              toggleStatus();
              void navigate('/registration');
            }}
          />
        </>
      )}
    </div>
  );
}
