import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/NavBar';
import { Catalog } from './pages/Catalog';
import { Registration } from './pages/Registration';
import { ProductDetails } from './pages/ProductDetails';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { CartContext, CartProduct } from './components/CartContext';
import { useState } from 'react';
import { Product } from './library/data';

export default function App() {
  const [cart, setCart] = useState<CartProduct[]>([]);

  async function addToCart(item: Product, size: number) {
    const exists = cart.find(
      (product) => product.item?.productId === item.productId
    );
    if (!exists) {
      const cartItem = { productId: item.productId, quantity: 1, size };
      const response = await fetch('/api/catalog/cart', {
        method: 'POST',
        headers: {
          'content-type': 'application/JSON',
        },
        body: JSON.stringify(cartItem),
      });
      if (!response.ok)
        throw new Error(`Error! bad network request ${response.status}`);
      setCart([...cart, { item, quantity: 1, size }]);
    }
  }

  async function removeFromCart(item: CartProduct): Promise<void> {
    item.quantity--;
    if (item.quantity === 0) {
      const filtered = cart.filter(
        (p) => p.item.productId !== item.item.productId
      );
      const response = await fetch(`/api/catalog/cart/${item.item.productId}`, {
        method: 'DELETE',
      });
      if (!response.ok)
        throw new Error('Error! bad network request ${response.status}');
      setCart([...filtered]);
    }
  }

  return (
    <>
      <CartContext.Provider
        value={{
          cart: cart,
          addToCart: addToCart,
          removeFromCart: removeFromCart,
        }}>
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
