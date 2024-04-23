import { createContext } from 'react';

export const NavContext = createContext({
  isItOpen: true || false,
  closeNavDrawer: () => undefined,
  openNavDrawer: () => undefined,
});

export const SearchContext = createContext({
  isSearchOpen: true || false,
  closeSearchDrawer: () => undefined,
  openSearchDrawer: () => undefined,
});

export const CartDrawerContext = createContext({
  isCartOpen: true || false,
  closeCartDrawer: () => undefined,
  openCartDrawer: () => undefined,
});
