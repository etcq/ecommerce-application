import { useEffect, useRef, useState } from 'react';
import BurgerButton from './burger-button/BurgerButton';
import styles from './burgerMenu.module.scss';
import { NavLink, Link } from 'react-router';
import { useAuthStore } from '@/core/stores/use-auth.ts';
import { useCartStore } from '@/core/stores/use-cart.ts';
import { menuDefaultLinks, ROUTES } from '@/constants/constants';

export default function BurgerMenu(): React.JSX.Element {
  const [burgerOpen, setOpened] = useState(false);
  const { isLoggedIn, logout } = useAuthStore();
  const { clearCart } = useCartStore();

  const menu: React.RefObject<null | HTMLDivElement> = useRef(null);
  useEffect(() => {
    if (!burgerOpen) return;
    const closeMenu = (event: MouseEvent): void => {
      if (menu.current && event.target instanceof Node && !menu.current.contains(event.target)) {
        setOpened(!burgerOpen);
      }
    };
    const timeout = setTimeout(() => {
      document.addEventListener('click', closeMenu);
    }, 0);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', closeMenu);
    };
  }, [burgerOpen, isLoggedIn]);

  return (
    <>
      <div className={`${styles['burger-menu']} ${burgerOpen ? styles['burger-menu__open'] : ''}`} ref={menu}>
        <ul className={styles['burger-menu__list']}>
          {menuDefaultLinks.map((link) => (
            <NavLink
              to={link.route}
              className={({ isActive }) => (isActive ? styles.active : '')}
              key={link.route}
              onClick={() => {
                setOpened(false);
              }}
            >
              <li className={styles['burger-menu__list_item']}>
                {link.caption}
                <div className={styles.underline}></div>
              </li>
            </NavLink>
          ))}
          {isLoggedIn ? (
            <>
              <NavLink
                to={ROUTES.PROFILE}
                className={({ isActive }) => (isActive ? styles.active : '')}
                onClick={() => setOpened(false)}
              >
                <li className={styles['burger-menu__list_item']}>
                  Profile
                  <div className={styles.underline}></div>
                </li>
              </NavLink>
              <Link
                to={ROUTES.MAIN}
                onClick={() => {
                  setOpened(false);
                  logout();
                  clearCart();
                }}
              >
                <li className={styles['burger-menu__list_item']}>
                  Log out
                  <div className={styles.underline}></div>
                </li>
              </Link>
            </>
          ) : (
            <>
              <NavLink
                to={ROUTES.LOGIN}
                className={({ isActive }) => (isActive ? styles.active : '')}
                onClick={() => setOpened(false)}
              >
                <li className={styles['burger-menu__list_item']}>
                  Log in
                  <div className={styles.underline}></div>
                </li>
              </NavLink>
              <NavLink
                to={ROUTES.REGISTRATION}
                className={({ isActive }) => (isActive ? styles.active : '')}
                onClick={() => setOpened(false)}
              >
                <li className={styles['burger-menu__list_item']}>
                  Registration
                  <div className={styles.underline}></div>
                </li>
              </NavLink>
            </>
          )}
        </ul>
      </div>
      <BurgerButton open={burgerOpen} setOpened={setOpened} />
    </>
  );
}
