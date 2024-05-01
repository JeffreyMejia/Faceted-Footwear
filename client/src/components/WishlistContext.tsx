import { createContext } from 'react';
import { Product } from '../library/data';

export type wishlistItem = {
  item: Product;
};

export type wishlistValues = {
  wishlist: wishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (item: wishlistItem) => void;
};

export const WishlistContext = createContext<wishlistValues>({
  wishlist: [],
  addToWishlist: () => undefined,
  removeFromWishlist: () => undefined,
});
