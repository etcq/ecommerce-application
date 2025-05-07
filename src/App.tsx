import AboutPage from './pages/about/AboutUs';
import MainPage from './pages/main/Main';
import ProductList from './pages/products/product-list/ProductList';
import Header from './components/header/Header';
import LoginPage from './pages/user/login/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import ProfilePage from './pages/user/profile/Profile';
import RegistrationPage from './pages/user/registration/RegistrationPage';
import { ROUTES } from './constants/constants';
import Bucket from './pages/bucket/Bucket';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route index element={<MainPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.PRODUCT_LIST} element={<ProductList />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
          <Route path={ROUTES.BUCKET} element={<Bucket />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
