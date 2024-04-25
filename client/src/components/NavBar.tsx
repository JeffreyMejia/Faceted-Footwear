import { Outlet, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaShoppingCart, FaCube } from 'react-icons/fa';
import { NavDrawer } from './NavDrawer';
import { SearchDrawer } from './SearchDrawer';
import { CartDrawer } from './CartDrawer';
import { useState } from 'react';

export function Navbar() {
  const navigate = useNavigate();
  const [openNavDrawer, setOpenNavDrawer] = useState(false);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);

  return (
    <div>
      <div className="flex w-full bg-transparent px-4 h-16 items-center justify-between sticky top-0 z-50">
        <FaBars
          onClick={() => setOpenNavDrawer(true)}
          className="fill-primary cursor-pointer h-7 w-7 hover:fill-tertiary active:fill-tertiary"
        />
        <NavDrawer
          isItOpen={openNavDrawer}
          close={() => setOpenNavDrawer(false)}
        />
        <div className="flex bg-secondary h-full items-center p-4">
          <h1 className="text-primary text-2xl md:text-4xl lg:text-4xl font-zen">
            Faceted Footwear
          </h1>
          <FaCube
            onClick={() => navigate('/')}
            className="text-primary ml-3 h-7 w-7 hover:animate-spin active:animate-bounce"
          />
        </div>
        <div className="flex">
          <FaSearch
            onClick={() => setOpenSearchDrawer(true)}
            className="fill-primary cursor-pointer h-7 w-7 hover:fill-tertiary active:fill-tertiary"
          />
          <SearchDrawer
            close={() => setOpenSearchDrawer(false)}
            isItOpen={openSearchDrawer}
          />
          <FaShoppingCart
            onClick={() => setOpenCartDrawer(true)}
            className="fill-primary cursor-pointer h-7 w-7 ml-4 hover:fill-tertiary active:fill-tertiary"
          />
          <CartDrawer
            close={() => setOpenCartDrawer(false)}
            isItOpen={openCartDrawer}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
