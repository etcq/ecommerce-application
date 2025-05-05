import styles from './_login-menu.module.scss';
import { useEffect } from 'react';
interface loginMenuProps {
  userMenuStatus: boolean;
  // closeMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function LoginMenu(props: loginMenuProps): React.JSX.Element {
  const changeClass = (): string => {
    return props.userMenuStatus ? 'open' : 'close';
  };

  useEffect(() => {
    changeClass();
  });

  return (
    <div className={`${styles['login-menu']} ${styles[changeClass()]}`}>
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
