import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/NavBar';
import { Catalog } from './pages/Catalog';
import { Registration } from './pages/Registration';
import { ProductDetails } from './pages/ProductDetails';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { useState } from 'react';
import {
  NavContext,
  SearchContext,
  CartDrawerContext,
} from './components/DrawerContext';

export default function App() {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  function close(): void {
    setIsNavDrawerOpen(false);
  }
  function open(): void {
    setIsNavDrawerOpen(!isNavDrawerOpen);
  }

  function closeSearch(): void {
    setIsSearchDrawerOpen(false);
  }
  function openSearch(): void {
    setIsSearchDrawerOpen(!isSearchDrawerOpen);
  }

  function closeCart(): void {
    setIsCartDrawerOpen(false);
  }
  function openCart(): void {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  }

  return (
    <>
      <NavContext.Provider
        value={{
          isDrawerOpen: isNavDrawerOpen,
          closeNavDrawer: close,
          openNavDrawer: open,
        }}>
        <SearchContext.Provider
          value={{
            isSearchOpen: isSearchDrawerOpen,
            closeSearchDrawer: closeSearch,
            openSearchDrawer: openSearch,
          }}>
          <CartDrawerContext.Provider
            value={{
              isCartOpen: isCartDrawerOpen,
              closeCartDrawer: closeCart,
              openCartDrawer: openCart,
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
          </CartDrawerContext.Provider>
        </SearchContext.Provider>
      </NavContext.Provider>
    </>
  );
}
