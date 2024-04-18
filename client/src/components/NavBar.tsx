import { Outlet } from 'react-router-dom';
import { FaBars, FaSearch, FaShoppingCart, FaCube } from 'react-icons/fa';
import { NavDrawer } from './NavDrawer';
import { useState } from 'react';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex w-full bg-black px-4 h-16 items-center justify-between sticky top-0 z-50">
        <FaBars
          onClick={() => setOpen(!open)}
          className="fill-primary cursor-pointer h-7 w-7"
        />
        <NavDrawer isOpen={open} open={() => setOpen(!open)} />
        <div className="flex bg-secondary h-full items-center p-4">
          <h1 className="text-primary font-bold text-lg">Faceted Footwear</h1>
          <FaCube className="text-primary ml-3 h-7 w-7 hover:animate-spin" />
        </div>
        <div className="flex">
          <FaSearch className="fill-primary cursor-pointer h-7 w-7" />
          <FaShoppingCart className="fill-primary cursor-pointer h-7 w-7 ml-4" />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
