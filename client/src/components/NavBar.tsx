import { Outlet, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaShoppingCart, FaCube } from 'react-icons/fa';
import { NavDrawer } from './NavDrawer';
import { useContext } from 'react';
import { closeContext } from './NavDrawerCloseContext';

export function Navbar() {
  const navigate = useNavigate();
  const { isItOpen, openNavDrawer, closeNavDrawer } = useContext(closeContext);

  return (
    <div>
      <div className="flex w-full bg-transparent px-4 h-16 items-center justify-between sticky top-0 z-50">
        <FaBars
          onClick={openNavDrawer}
          className="fill-primary cursor-pointer h-7 w-7"
        />
        <NavDrawer isOpen={isItOpen} open={openNavDrawer} />
        <div
          onClick={closeNavDrawer}
          className="flex bg-secondary h-full items-center p-4">
          <h1 className="text-primary font-bold text-lg text-opacity-95">
            Faceted Footwear
          </h1>
          <FaCube
            onClick={() => navigate('/')}
            className="text-primary ml-3 h-7 w-7 hover:animate-spin active:animate-bounce"
          />
        </div>
        <div onClick={closeNavDrawer} className="flex">
          <FaSearch className="fill-primary cursor-pointer h-7 w-7" />
          <FaShoppingCart className="fill-primary cursor-pointer h-7 w-7 ml-4" />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
