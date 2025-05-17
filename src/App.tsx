import { BrowserRouter, Routes, Route } from 'react-router';
import { ROUTES } from './constants/constants';
import { RedirectForAuthPerson } from './core/routes/protected-routes';
import { useAuthStore } from './core/stores/use-auth-state';
import { lazy, useEffect, Suspense } from 'react';
import Header from './components/header/Header';
import Loading from './components/loading/Loading';

const MainPage = lazy(() => import('@pages/main/Main'));
const AboutPage = lazy(() => import('@pages/about/AboutUs'));
const ProductList = lazy(() => import('@pages/products/product-list/ProductList'));
const LoginPage = lazy(() => import('@pages/user/login/LoginPage'));
const NotFoundPage = lazy(() => import('@pages/not-found/NotFoundPage'));
const ProfilePage = lazy(() => import('@pages/user/profile/Profile'));
const RegistrationPage = lazy(() => import('@pages/user/registration/RegistrationPage'));
const Cart = lazy(() => import('@pages/cart/Cart'));

function App() {
  const { initializationAuth } = useAuthStore();

  useEffect(() => {
    initializationAuth();
  }, [initializationAuth]);

  return (
    <BrowserRouter>
      <div data-testid="app">
        <Header />
        <main>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route index element={<MainPage />} />
              <Route path={ROUTES.ABOUT} element={<AboutPage />} />
              <Route path={ROUTES.PRODUCT_LIST} element={<ProductList />} />
              <Route element={<RedirectForAuthPerson />}>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
              </Route>
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTES.CART} element={<Cart />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
