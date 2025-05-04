import LoginMenu from './login-menu/LoginMenu';

import styles from './header.module.scss';
import logoImg from '../../assets/images/header/logo.png';
import { NavLink } from 'react-router';

export default function Header(): React.JSX.Element {
  return (
    <div className="container">
      <header className={styles.header}>
        <div className={styles.header__logo}>
          <img src={logoImg} className={styles['header__logo-img']} alt="SneakHub" />
          <span className={styles['header__logo-title']}>SNEAKHUB</span>
        </div>
        <ul className={styles['nav-menu']}>
          <li className={styles['nav-menu-item']}>
            <NavLink to="/">Home</NavLink>
            <div className={styles.underline}></div>
          </li>
          <li className={styles['nav-menu-item']}>
            <NavLink to="/product-list">Catalog</NavLink>
            <div className={styles.underline}></div>
          </li>
          <li className={styles['nav-menu-item']}>
            <NavLink to="/about">About Us</NavLink>
            <div className={styles.underline}></div>
          </li>
        </ul>
        <div className={styles.header__user}>
          <div className={styles['header__user-login']}></div>
          <div className={styles['header__user-bucket']}></div>
        </div>
        <LoginMenu />
      </header>
    </div>
  );
}
