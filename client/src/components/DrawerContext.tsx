import { createContext } from 'react';

export const NavContext = createContext({
  isDrawerOpen: true,
  closeNavDrawer: () => undefined,
  openNavDrawer: () => undefined,
});

export const SearchContext = createContext({
  isSearchOpen: true,
  closeSearchDrawer: () => undefined,
  openSearchDrawer: () => undefined,
});

export const CartDrawerContext = createContext({
  isCartOpen: true,
  closeCartDrawer: () => undefined,
  openCartDrawer: () => undefined,
});
