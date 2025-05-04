import AboutPage from './containers/about/AboutUs';
import MainPage from './containers/main/Main';
import ProductList from './containers/products/product-list/ProductList';
import Header from './header/Header';
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
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
