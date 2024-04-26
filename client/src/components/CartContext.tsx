import { createContext } from 'react';
import { Product } from '../library/data';

export type CartProduct = {
  item: Product;
  quantity: number;
  size: number;
};

export type CartValues = {
  cart: CartProduct[];
  addToCart: (product: Product, size: number) => void;
  removeFromCart: (product: CartProduct) => void;
};

export const CartContext = createContext<CartValues>({
  cart: [],
  addToCart: () => undefined,
  removeFromCart: () => undefined,
});
