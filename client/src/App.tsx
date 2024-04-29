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
import { Product, updateQuantity, add, remove } from './library/data';

export default function App() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [error, setError] = useState<unknown>();

  async function addToCart(item: Product, size: number) {
    try {
      const exists = cart.find(
        (product) =>
          product.item?.productId === item.productId && product.size === size
      );
      if (!exists) {
        const cartItem = { productId: item.productId, quantity: 1, size };
        add(cartItem);
        setCart([...cart, { item, quantity: 1, size }]);
      } else if (exists.size !== size) {
        const cartItem = { productId: item.productId, quantity: 1, size };
        add(cartItem);
        setCart([...cart, { item, quantity: 1, size }]);
      }
    } catch (error) {
      setError(error);
    }
  }

  async function incrementProductInCart(product: CartProduct) {
    try {
      product.quantity++;
      const newArr = cart.map((item) =>
        item.item.productId === product.item.productId &&
        item.size === product.size
          ? product
          : item
      );
      await updateQuantity(product);
      setCart(newArr);
    } catch (error) {
      setError(error);
    }
  }

  async function removeFromCart(item: CartProduct): Promise<void> {
    try {
      item.quantity--;
      const newArr = cart.map((product) =>
        product.item.productId === item.item.productId &&
        item.size === product.size
          ? item
          : product
      );
      await updateQuantity(item);
      setCart(newArr);
      if (item.quantity === 0) {
        const filtered = cart.filter(
          (p) =>
            p.item.productId !== item.item.productId || p.size !== item.size
        );
        await remove(item);
        setCart([...filtered]);
      }
    } catch (error) {
      setError(error);
    }
  }

  if (error) {
    return (
      <div className="text-primary">
        Error Loading catalog:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }
  return (
    <>
      <CartContext.Provider
        value={{
          cart: cart,
          addToCart: addToCart,
          removeFromCart: removeFromCart,
          incrementProductInCart: incrementProductInCart,
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
