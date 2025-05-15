import AboutPage from './pages/about/AboutUs';
import MainPage from './pages/main/Main';
import ProductList from './pages/products/product-list/ProductList';
import Header from './components/header/Header';
import LoginPage from './pages/user/login/LoginPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import ProfilePage from './pages/user/profile/Profile';
import RegistrationPage from './pages/user/registration/RegistrationPage';
import { ROUTES } from './constants/constants';
import Bucket from './pages/bucket/Bucket';
import { RedirectForAuthPerson } from './core/routes/protected-routes';
import { useAuthStore } from './core/stores/use-auth-state';
import { useEffect } from 'react';

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
          <Routes>
            <Route index element={<MainPage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.PRODUCT_LIST} element={<ProductList />} />
            <Route element={<RedirectForAuthPerson />}>
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
            </Route>
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.BUCKET} element={<Bucket />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
