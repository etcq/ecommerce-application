import { NavLink } from 'react-router';

import LoginMenu from './login-menu/LoginMenu';
import logoImg from '../../assets/images/header/logo.png';

import styles from './header.module.scss';
import userImg from '../../assets/images/header/user.svg';
import bucketImg from '../../assets/images/header/bucket.svg';
import { useLoginMenu } from '../../core/state/stateLoginMenu';

export default function Header(): React.JSX.Element {
  const { toggleStatus } = useLoginMenu();

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
          <div className={styles['header__user-wrapper']}>
            <div className={styles['header__user-icon']} onClick={() => toggleStatus()}>
              <img src={userImg} />
            </div>
            <LoginMenu />
          </div>
          <div className={styles['header__user-icon']}>
            <img src={bucketImg} />
          </div>
        </div>
      </header>
    </div>
  );
}
