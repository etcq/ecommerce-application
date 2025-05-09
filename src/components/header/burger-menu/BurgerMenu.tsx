import { useEffect, useRef, useState } from 'react';
import BurgerButton from './burger-button/BurgerButton';
import styles from './burger-menu.module.scss';
import { NavLink } from 'react-router';
import { useLoginMenu } from '@/core/stores/stateLoginMenu';

export default function BurgerMenu(): React.JSX.Element {
  const [burgerOpen, setOpened] = useState(false);
  const { isLogged } = useLoginMenu();

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
  }, [burgerOpen]);

  return (
    <>
      <div className={`${styles['burger-menu']} ${burgerOpen ? styles['burger-menu__open'] : ''}`} ref={menu}>
        <ul className={styles['burger-menu__list']}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={() => setOpened(false)}
          >
            <li className={styles['burger-menu__list_item']}>
              Home
              <div className={styles.underline}></div>
            </li>
          </NavLink>
          <NavLink
            to="/product-list"
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={() => setOpened(false)}
          >
            <li className={styles['burger-menu__list_item']}>
              Catalog
              <div className={styles.underline}></div>
            </li>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={() => setOpened(false)}
          >
            <li className={styles['burger-menu__list_item']}>
              About Us
              <div className={styles.underline}></div>
            </li>
          </NavLink>
          {isLogged ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? styles.active : '')}
                onClick={() => setOpened(false)}
              >
                <li className={styles['burger-menu__list_item']}>
                  Profile
                  <div className={styles.underline}></div>
                </li>
              </NavLink>
              <NavLink
                to="/logout"
                className={({ isActive }) => (isActive ? styles.active : '')}
                onClick={() => setOpened(false)}
              >
                <li className={styles['burger-menu__list_item']}>
                  Log out
                  <div className={styles.underline}></div>
                </li>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : '')}
                onClick={() => setOpened(false)}
              >
                <li className={styles['burger-menu__list_item']}>
                  Log in
                  <div className={styles.underline}></div>
                </li>
              </NavLink>
              <NavLink
                to="/registration"
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
