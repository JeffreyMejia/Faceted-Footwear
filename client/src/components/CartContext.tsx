import { createContext } from 'react';
import { Product } from '../library/data';

export type CartProduct = Product & {
  quantity: number;
  size: number;
};

export type CartValues = {
  cart: CartProduct[];
  addToCart: (product: Product, size: number) => void;
  removeFromCart: (product: CartProduct) => void;
  incrementProductInCart: (product: CartProduct) => void;
  checkout: (item: CartProduct[]) => void;
  cartSignOut: () => void;
  cartDrawerOpen: () => void;
  cartDrawerClose: () => void;
  isCartDrawerOpen: boolean;
};

export const CartContext = createContext<CartValues>({
  cart: [],
  addToCart: () => undefined,
  removeFromCart: () => undefined,
  incrementProductInCart: () => undefined,
  checkout: () => undefined,
  cartSignOut: () => undefined,
  cartDrawerOpen: () => undefined,
  cartDrawerClose: () => undefined,
  isCartDrawerOpen: true,
});
