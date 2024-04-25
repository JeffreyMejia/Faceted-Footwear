import { createContext } from 'react';
import { Product } from '../library/data';

export type CartProduct = {
  item: Product;
  quantity: number;
};

export type CartValues = {
  cart: CartProduct[];
  addToCart: (product: Product) => void;
};

export const CartContext = createContext<CartValues>({
  cart: [],
  addToCart: () => undefined,
});
