import { BrowserRouter, Routes, Route } from 'react-router';
import { ROUTES } from './constants/constants';
import { RedirectForAuthPerson, RedirectForNotAuthPerson } from './core/routes/protected-routes';
import { useAuthStore } from './core/stores/use-auth-state';
import { lazy, useEffect } from 'react';
import { useToastStore } from '@/core/stores/toast.ts';
import { Toast } from '@components/toast/Toast.tsx';
import Layout from './components/layout/Layout';

const MainPage = lazy(() => import('@pages/main/Main'));
const AboutPage = lazy(() => import('@pages/about/AboutUs'));
const ProductList = lazy(() => import('@pages/products/product-list/ProductList'));
const LoginPage = lazy(() => import('@pages/user/login/LoginPage'));
const NotFoundPage = lazy(() => import('@pages/not-found/NotFoundPage'));
const ProfilePage = lazy(() => import('@pages/user/profile/Profile'));
const RegistrationPage = lazy(() => import('@pages/user/registration/RegistrationPage'));
const Cart = lazy(() => import('@pages/cart/Cart'));
const ProductDetailed = lazy(() => import('@pages/products/product-detailed/ProductDetailed.tsx'));

function App() {
  const { initializationAuth } = useAuthStore();
  const { message, clearMessage } = useToastStore();

  useEffect(() => {
    initializationAuth();
  }, [initializationAuth]);

  return (
    <BrowserRouter>
      <div data-testid="app">
        {message && <Toast message={message} onClose={clearMessage} />}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.PRODUCT_LIST}>
              <Route index element={<ProductList />} />
              <Route path=":id" element={<ProductDetailed />} />
            </Route>
            <Route element={<RedirectForAuthPerson />}>
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
            </Route>
            <Route element={<RedirectForNotAuthPerson />}>
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            </Route>
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
