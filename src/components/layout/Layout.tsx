import { Outlet } from 'react-router';
import Header from '../header/Header';
import { Suspense } from 'react';
import Loading from '../loading/Loading';

export default function Layout(): React.JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
