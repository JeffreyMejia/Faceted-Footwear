import { CartProduct } from '../components/CartContext';
import { User } from '../components/UserContext';
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

export const tokenKey = 'um.token';

export function saveToken(token: string | undefined): void {
  if (token) {
    sessionStorage.setItem(tokenKey, token);
  } else {
    sessionStorage.removeItem(tokenKey);
  }
}

export function readToken(): string {
  const token = sessionStorage.getItem(tokenKey);
  if (!token) throw new Error('No token found');
  return token;
}

// All fetches below

export async function add(cartItem: Props) {
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
  const response = await fetch(
    `/api/catalog/cart/${cartProduct.item.productId}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/JSON',
        Authorization: `Bearer ${readToken()}`,
      },
      body: JSON.stringify({
        quantity: cartProduct.quantity,
        size: cartProduct.size,
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`Error! bad network request ${response.status}`);
  }
}

export async function remove(product: CartProduct) {
  const response = await fetch(
    `/api/catalog/cart/${product.item.productId}/${product.size}`,
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
  const response = await fetch(`/api/catalog/details/${productId}`, {
    headers: { Authorization: `Bearer ${readToken()}` },
  });
  if (!response.ok) throw new Error(`fetch Error ${response.status}`);
  const result = await response.json();
  return result;
}

export async function readCart(user: User | undefined) {
  const response = await fetch(`/api/catalog/cart/${user?.userId}`, {
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
    throw new Error('Error! bad network request ${response.status}');
}
