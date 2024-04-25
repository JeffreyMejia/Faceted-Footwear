import { toDollars } from '../library/to-dollars';
import { useParams } from 'react-router-dom';
import type { Product } from '../library/data';
import { useEffect, useState, useContext, FormEvent } from 'react';
import { CartContext } from '../components/CartContext';

export function ProductDetails() {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [product, setProduct] = useState<Product>();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function loadProduct(productId: number) {
      try {
        const response = await fetch(`/api/catalog/details/${productId}`);
        if (!response.ok) throw new Error(`fetch Error ${response.status}`);
        const result = await response.json();
        setProduct(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct(Number(productId));
  }, [productId]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !product) {
    return (
      <div className="text-primary">
        Error Loading catalog:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  function handleAddToCart(event: FormEvent<HTMLFormElement>, size: number) {
    console.log('size:', size);
    event.preventDefault();
    if (!product) throw new Error('you broke something');
    alert(`${product.name} added to cart`);
    addToCart(product, size);
  }

  const { brand, name, amount, image, details } = product;
  return (
    <div className="container mt-4">
      <div className="flex  text-primary bg-secondary rounded shadow-wrapper">
        <div className="ml-3">
          <img
            className="object-contain mt-3  object-contain"
            src={image}
            alt={name}
          />
          <h1 className="text-3xl font-bold my-3">{`${brand} ${name}`}</h1>
          <h3>{toDollars(amount)}</h3>
        </div>
        <div className="mx-6 mt-3">
          <h1 className="text-3xl font-bold">Details</h1>
          <p className="whitespace-normal">{details}</p>
          <h3 className="text-xl mt-10 mb-5">Choose your size</h3>
          <form onSubmit={(e) => handleAddToCart(e, e.currentTarget.value)}>
            <label>
              <select name="sizes" id="size-select">
                <option defaultValue={'select-size'}>select-size</option>
                <Size size={8} />
                <Size size={8.5} />
                <Size size={9} />
                <Size size={9.5} />
                <Size size={10} />
                <Size size={10.5} />
                <Size size={11} />
                <Size size={11.5} />
                <Size size={12} />
              </select>
            </label>
            <button
              type="submit"
              className="bg-tertiary text-black hover:text-white rounded p-1 ml-2">
              Add to cart
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Size({ size }) {
  return (
    <option value={size} className="bg-black">
      {size}
    </option>
  );
}
