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
  cartCheckout,
  readLocalCart,
  saveCartLocally,
} from './library/data';
import { AppContext, User } from './components/UserContext';
import { Wishlist } from './pages/Wishlist';
import { AccountPage } from './pages/AccountPage';
import { WishlistContext, wishlistItem } from './components/WishlistContext';
import { Checkout } from './pages/checkout';

export default function App() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [error, setError] = useState<unknown>();
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [wishlist, setWishlist] = useState<wishlistItem[]>([]);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const cart = await readCart();
        setCart(cart);
      } catch (error) {
        setError(error);
      }
    }
    if (user) {
      const localCart = readLocalCart();
      if (localCart) {
        localCart.map((p) => cartAddition(p));
        // const oldCart = localCart.map((p) =>
        //   localStorage.removeItem(JSON.stringify(p))
        // );
        // saveCartLocally(oldCart);
      }
      load();
    } else {
      const localCart = readLocalCart();
      setCart(localCart);
    }
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
        setCart([...cart, { ...item, quantity: 1, size }]);
        if (user) {
          await cartAddition(cartItem);
        } else {
          saveCartLocally([...cart, { ...item, quantity: 1, size }]);
        }
      } else if (exists.size !== size) {
        const cartItem = { productId: item.productId, quantity: 1, size };
        setCart([...cart, { ...item, quantity: 1, size }]);
        if (user) {
          await cartAddition(cartItem);
        } else {
          saveCartLocally(cart);
        }
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
      setCart(newArr);
      if (user) {
        await updateQuantity(product);
      } else {
        saveCartLocally(cart);
      }
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
      setCart(newArr);
      if (user) {
        await updateQuantity(item);
      } else {
        saveCartLocally(cart);
      }
      if (item.quantity === 0) {
        const filtered = cart.filter(
          (p) => p.productId !== item.productId || p.size !== item.size
        );
        setCart([...filtered]);
        if (user) {
          await cartRemoval(item);
        } else {
          saveCartLocally(filtered);
        }
      }
    } catch (error) {
      setError(error);
    }
  }

  async function checkout(cart: CartProduct[]) {
    const filtered = cart.filter(
      (p) => p.productId !== p.productId || p.size !== p.size
    );
    setCart([...filtered]);
    await cartCheckout();
  }

  function cartSignOut() {
    setCart([]);
  }

  function cartDrawerOpen() {
    setOpenCartDrawer(true);
  }

  function cartDrawerClose() {
    setOpenCartDrawer(false);
  }

  const isCartDrawerOpen = openCartDrawer;

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
    checkout,
    cartSignOut,
    cartDrawerOpen,
    cartDrawerClose,
    isCartDrawerOpen,
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
                <Route path="checkout" element={<Checkout />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </WishlistContext.Provider>
        </CartContext.Provider>
      </AppContext.Provider>
    </>
  );
}
