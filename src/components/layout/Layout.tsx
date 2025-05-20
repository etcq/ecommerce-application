import { Outlet, useLocation } from 'react-router';
import Header from '../header/Header';
import { Suspense } from 'react';
import Loading from '../loading/Loading';

export default function Layout(): React.JSX.Element {
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
