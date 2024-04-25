import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/NavBar';
import { Catalog } from './pages/Catalog';
import { Registration } from './pages/Registration';
import { ProductDetails } from './pages/ProductDetails';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { CartContext } from './components/CartContext';
import { useState } from 'react';
import { Product } from './library/data';

export default function App() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  function addToCart(item: Product): void {
    const cartItem = { item, quantity: 1 };
    setCart([...cart, cartItem]);
  }

  return (
    <>
      <CartContext.Provider value={{ cart: cart, addToCart: addToCart }}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="registration" element={<Registration />} />
            <Route path="details/:productId" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartContext.Provider>
    </>
  );
}
