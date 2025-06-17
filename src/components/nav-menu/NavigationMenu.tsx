import { JSX } from 'react';
import styles from './navigation-menu.module.scss';
import { NavLink } from 'react-router';
import { IMenuLinks } from '@/interfaces/interfaces.ts';
import scrollToTop from '@/core/utils/scrollToTop.ts';

interface INavProps {
  links: IMenuLinks[];
  isDarkTheme: boolean;
  className?: string;
}

export default function NavigationMenu({ links, isDarkTheme, className }: INavProps): JSX.Element {
  return (
    <ul className={`${styles['nav-menu']} ${className}`} role="menu" data-darktheme={isDarkTheme}>
      {links.map((link) => (
        <NavLink to={link.route} className={({ isActive }) => (isActive ? styles.active : '')} key={link.route}>
          <li
            className={styles['nav-menu-item']}
            onClick={() => {
              scrollToTop();
            }}
          >
            {link.caption}
            <div className={styles.underline}></div>
          </li>
        </NavLink>
      ))}
    </ul>
  );
}
