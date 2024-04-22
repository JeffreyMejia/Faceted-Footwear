import { createContext } from 'react';

export const closeContext = createContext({
  isItOpen: true || false,
  closeNavDrawer: () => undefined,
  openNavDrawer: () => undefined,
});
