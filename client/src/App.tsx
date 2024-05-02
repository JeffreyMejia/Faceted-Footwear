import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/NavBar';
import { Catalog } from './pages/Catalog';
import { Registration } from './pages/Registration';
import { ProductDetails } from './pages/ProductDetails';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { CartContext, CartProduct } from './components/CartContext';
import { useEffect, useState } from 'react';
import {
  Product,
  updateQuantity,
  cartAddition,
  cartRemoval,
  saveToken,
  wishlistAdd,
  wishlistRemove,
  readCart,
} from './library/data';
import { AppContext, User } from './components/UserContext';
import { Wishlist } from './pages/Wishlist';
import { AccountPage } from './pages/AccountPage';
import { WishlistContext, wishlistItem } from './components/WishlistContext';

export default function App() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [error, setError] = useState<unknown>();
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [wishlist, setWishlist] = useState<wishlistItem[]>([]);

  useEffect(() => {
    async function load() {
      try {
        if (user !== undefined) {
          const cart = await readCart();
          setCart(cart);
        }
      } catch (error) {
        setError(error);
      }
    }
    load();
  }, [user]);

  async function addToWishlist(item: Product) {
    try {
      const exists = wishlist.find(
        (product) => product.item.productId === item.productId
      );
      if (!exists) {
        await wishlistAdd(item);
        setWishlist([...wishlist, { item }]);
      }
    } catch (error) {
      setError(error);
    }
  }

  async function removeFromWishlist(item: wishlistItem) {
    try {
      const filtered = wishlist.filter(
        (product) => product.item.productId !== item.item.productId
      );
      await wishlistRemove(item);
      setWishlist([...filtered]);
    } catch (error) {
      setError(error);
    }
  }

  function handleSignIn(user: User, token: string) {
    setUser(user);
    setToken(token);
    saveToken(token);
  }

  function handleSignOut() {
    setUser(undefined);
    setToken(undefined);
    saveToken(undefined);
  }

  async function addToCart(item: Product, size: number) {
    try {
      const exists = cart.find(
        (product) =>
          product.productId === item.productId && product.size === size
      );
      if (!exists) {
        const cartItem = { productId: item.productId, quantity: 1, size };
        await cartAddition(cartItem);
        setCart([...cart, { ...item, quantity: 1, size }]);
      } else if (exists.size !== size) {
        const cartItem = { productId: item.productId, quantity: 1, size };
        await cartAddition(cartItem);
        setCart([...cart, { ...item, quantity: 1, size }]);
      }
    } catch (error) {
      setError(error);
    }
  }

  async function incrementProductInCart(product: CartProduct) {
    try {
      product.quantity++;
      const newArr = cart.map((item) =>
        item.productId === product.productId && item.size === product.size
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
        product.productId === item.productId && item.size === product.size
          ? item
          : product
      );
      await updateQuantity(item);
      setCart(newArr);
      if (item.quantity === 0) {
        const filtered = cart.filter(
          (p) => p.productId !== item.productId || p.size !== item.size
        );
        setCart([...filtered]);
        await cartRemoval(item);
      }
    } catch (error) {
      setError(error);
    }
  }

  const userContextValue = { user, token, handleSignIn, handleSignOut };

  const wishlistContextValue = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  };

  const cartContextValue = {
    cart,
    addToCart,
    removeFromCart,
    incrementProductInCart,
  };

  if (error) {
    return (
      <div className="text-primary">
        Error Loading Cart:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }
  return (
    <>
      <AppContext.Provider value={userContextValue}>
        <CartContext.Provider value={cartContextValue}>
          <WishlistContext.Provider value={wishlistContextValue}>
            <Routes>
              <Route path="/" element={<Navbar user={user} />}>
                <Route index element={<Home />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="registration" element={<Registration />} />
                <Route path="details/:productId" element={<ProductDetails />} />
                <Route path="account" element={<AccountPage />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </WishlistContext.Provider>
        </CartContext.Provider>
      </AppContext.Provider>
    </>
  );
}
