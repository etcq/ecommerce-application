import AboutPage from './pages/about/AboutUs';
import MainPage from './pages/main/Main';
import ProductList from './pages/products/product-list/ProductList';
import Header from './components/header/Header';
import LoginPage from './pages/user/login/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
