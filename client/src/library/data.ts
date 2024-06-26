import { CartProduct } from '../components/CartContext';
import { wishlistItem } from '../components/WishlistContext';

export type Product = {
  brand: string;
  name: string;
  image: string;
  amount: number;
  details?: string;
  productId?: number;
};

type Props = {
  productId: number | undefined;
  quantity: number;
  size: number;
};

export const uppercaseRegex = new RegExp(/.*[A-Z]/);
export const numberRegex = new RegExp(/.*\d/);
export const lengthRegex = new RegExp(/.{8,}$/);
export const specialCharactersRegex = new RegExp(
  /.*[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/
);

export const tokenKey = 'um.token';
export const userKey = 'um.user';

export function saveToken(token: string | undefined): void {
  if (token) {
    localStorage.setItem(tokenKey, token);
  } else {
    localStorage.removeItem(tokenKey);
  }
}

export function readToken(): string {
  const token = localStorage.getItem(tokenKey);
  if (!token) throw new Error('No token found');
  return token;
}

export function saveCartLocally(cart: CartProduct[]) {
  if (cart.length > 0) {
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    localStorage.removeItem('cart');
  }
}

export function readLocalCart() {
  const cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
}

// All fetches below

export async function loadCarousel() {
  const response = await fetch('/api/carousel');
  if (!response.ok) {
    throw new Error(`Error! bad network request ${response.status}`);
  }
  const result = await response.json();
  return result;
}

export async function cartAddition(cartItem: Props) {
  const response = await fetch('/api/catalog/cart', {
    method: 'POST',
    headers: {
      'content-type': 'application/JSON',
      Authorization: `Bearer ${readToken()}`,
    },
    body: JSON.stringify(cartItem),
  });
  if (!response.ok)
    throw new Error(`Error! bad network request ${response.status}`);
}

export async function updateQuantity(cartProduct: CartProduct) {
  const response = await fetch(`/api/catalog/cart/${cartProduct.productId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/JSON',
      Authorization: `Bearer ${readToken()}`,
    },
    body: JSON.stringify({
      quantity: cartProduct.quantity,
      size: cartProduct.size,
    }),
  });
  if (!response.ok) {
    throw new Error(`Error! bad network request ${response.status}`);
  }
}

export async function cartRemoval(product: CartProduct) {
  const response = await fetch(
    `/api/catalog/cart/${product.productId}/${product.size}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${readToken()}` },
    }
  );
  if (!response.ok)
    throw new Error('Error! bad network request ${response.status}');
}

export async function readProduct(
  productId: number
): Promise<Product | undefined> {
  const response = await fetch(`/api/catalog/details/${productId}`);
  if (!response.ok) throw new Error(`fetch Error ${response.status}`);
  const result = await response.json();
  return result;
}

export async function readCart() {
  const response = await fetch(`/api/catalog/cart`, {
    headers: { Authorization: `Bearer ${readToken()}` },
  });
  const results = await response.json();
  if (!response.ok) throw new Error(`fetch Error ${response.status}`);
  return results;
}

export async function wishlistAdd(product: Product) {
  const response = await fetch(`/api/wishlist/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${readToken()}`,
      'content-type': 'application/JSON',
    },
    body: JSON.stringify({ productId: product.productId }),
  });
  const results = await response.json();
  if (!response.ok) throw new Error(`fetch Error ${response.status}`);
  return results;
}

export async function wishlistRemove(wishlistItem: wishlistItem) {
  const response = await fetch(`/api/wishlist/${wishlistItem.item.productId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${readToken()}` },
  });
  if (!response.ok)
    throw new Error(`Error! bad network request ${response.status}`);
}

export async function readBrands() {
  const response = await fetch('/api/catalog/brands');
  if (!response.ok)
    throw new Error(`Error! bad network request ${response.status}`);
  const results = await response.json();
  return results;
}

export async function cartCheckout() {
  const response = await fetch('/api/checkout', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${readToken()}` },
  });
  if (!response.ok)
    throw new Error(`Error! bad network request ${response.status}`);
}
