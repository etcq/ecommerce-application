import { useNavigate } from 'react-router';
import { useHeaderStore } from '@/core/stores/use-header.ts';
import styles from './login-menu.module.scss';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/button/Button';
import { ROUTES } from '@/constants/constants';
import { useAuthStore } from '@/core/stores/use-auth.ts';
import editNameView from '@/core/utils/edit-name-view';
import { useCartStore } from '@/core/stores/use-cart.ts';

export default function LoginMenu(): React.JSX.Element {
  const { isLoginMenuOpened, toggleLoginMenuOpened } = useHeaderStore();
  const { isLoggedIn, logout, customer } = useAuthStore();
  const { clearCart } = useCartStore();
  const [isByeMessageShown, setByeMessageShown] = useState(false);

  const menu: React.RefObject<null | HTMLDivElement> = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoginMenuOpened) return;
    const closeMenu = (event: MouseEvent): void => {
      if (menu.current && event.target instanceof Node && !menu.current.contains(event.target)) {
        toggleLoginMenuOpened();
      }
    };
    const timeout = setTimeout(() => {
      document.addEventListener('click', closeMenu);
    }, 0);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', closeMenu);
    };
  }, [isLoginMenuOpened, isByeMessageShown, toggleLoginMenuOpened]);

  return (
    <div
      className={`${styles['login-menu']} ${isLoginMenuOpened ? styles.open : styles.close}`}
      ref={menu}
      data-testid="login-menu"
    >
      <div className={styles['login-menu__head']}></div>
      {isByeMessageShown ? (
        <div className={styles['login-menu__title']}>
          <h3>
            Good Bye <br /> {editNameView(customer?.firstName)}
          </h3>
        </div>
      ) : isLoggedIn ? (
        <>
          <div className={styles['login-menu__title']}>
            <h3>Hello, {editNameView(customer?.firstName)}</h3>
          </div>
          <Button
            size="medium"
            type="button"
            children="Profile"
            onClick={() => {
              toggleLoginMenuOpened();
              void navigate(ROUTES.PROFILE);
            }}
          />
          <Button
            type="button"
            size="medium"
            children="Log Out"
            onClick={() => {
              setByeMessageShown(true);
              setTimeout(() => {
                void navigate(ROUTES.MAIN);
                setByeMessageShown(false);
                logout();
                clearCart();
                toggleLoginMenuOpened();
              }, 800);
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
              toggleLoginMenuOpened();
              void navigate(ROUTES.LOGIN);
            }}
          />
          <Button
            size="medium"
            children="Registration"
            type="button"
            onClick={() => {
              toggleLoginMenuOpened();
              void navigate(ROUTES.REGISTRATION);
            }}
          />
        </>
      )}
    </div>
  );
}
