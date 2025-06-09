import { Outlet, useLocation } from 'react-router';
import Header from '../header/Header';
import { Suspense, JSX } from 'react';
import Loading from '../loading/Loading';

export default function Layout(): JSX.Element {
  const location = useLocation();
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loading />} key={location.key}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
