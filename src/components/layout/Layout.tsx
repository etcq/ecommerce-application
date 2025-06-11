import { Outlet, useLocation } from 'react-router';
import Header from '../header/Header';
import { Suspense, JSX } from 'react';
import Loading from '../loading/Loading';
import Footer from '@components/footer/Footer.tsx';
import styles from './layout.module.scss';

export default function Layout(): JSX.Element {
  const location = useLocation();
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        <Suspense fallback={<Loading />} key={location.key}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
