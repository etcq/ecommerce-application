import styles from './loginPage.module.scss';
import React from 'react';
import { LoginForm } from '@components/form/login/login.tsx';
import imgPath from '@assets/images/login/login-sneakers.jpg';

export default function LoginPage(): React.JSX.Element {
  return (
    <main className={styles.loginPage}>
      <div className={styles.inner}>
        <div className={styles.container}>
          <LoginForm />
        </div>
        <div className={`${styles.container} ${styles.hide}`}>
          <img className={styles.img} src={imgPath} alt={'sneakers'} />
        </div>
      </div>
    </main>
  );
}
