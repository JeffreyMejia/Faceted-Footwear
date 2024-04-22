import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/NavBar';
import { Catalog } from './pages/Catalog';
import { Registration } from './pages/Registration';
import { ProductDetails } from './pages/ProductDetails';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { useState } from 'react';
import { closeContext } from './components/NavDrawerCloseContext';

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function close() {
    setIsDrawerOpen(false);
    return undefined;
  }
  function open() {
    setIsDrawerOpen(!isDrawerOpen);
    return undefined;
  }

  return (
    <>
      <closeContext.Provider
        value={{
          isItOpen: isDrawerOpen,
          closeNavDrawer: close,
          openNavDrawer: open,
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
      </closeContext.Provider>
    </>
  );
}
