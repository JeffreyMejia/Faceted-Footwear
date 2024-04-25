import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/NavBar';
import { Catalog } from './pages/Catalog';
import { Registration } from './pages/Registration';
import { ProductDetails } from './pages/ProductDetails';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="registration" element={<Registration />} />
          <Route path="details/:productId" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
