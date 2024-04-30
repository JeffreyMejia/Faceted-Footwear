import { Outlet, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaShoppingCart, FaCube } from 'react-icons/fa';
import { NavDrawer } from './NavDrawer';
import { SearchDrawer } from './SearchDrawer';
import { CartDrawer } from './CartDrawer';
import { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import { User } from './UserContext';

type Props = {
  user: User | undefined;
};

export function Navbar({ user }: Props) {
  const navigate = useNavigate();
  const [openNavDrawer, setOpenNavDrawer] = useState(false);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const { cart } = useContext(CartContext);

  let quantity = 0;

  cart.forEach((cp) => (quantity += cp.quantity));

  return (
    <div>
      <div className="flex w-full bg-transparent px-4 h-16 items-center justify-between sticky top-0 z-50">
        <FaBars
          onClick={() => setOpenNavDrawer(true)}
          className="fill-primary cursor-pointer h-7 w-7 hover:fill-tertiary active:fill-tertiary"
        />
        <NavDrawer
          user={user}
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
          {quantity !== 0 && (
            <span className="absolute top-3 right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-secondary rounded-full">
              {quantity}
            </span>
          )}
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
