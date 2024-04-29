import { CartProduct } from '../components/CartContext';

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

// All fetches below

export async function add(cartItem: Props) {
  const response = await fetch('/api/catalog/cart', {
    method: 'POST',
    headers: {
      'content-type': 'application/JSON',
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
