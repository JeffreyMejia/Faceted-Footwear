import { toDollars } from '../library/to-dollars';
import { useParams } from 'react-router-dom';
import type { Product } from '../library/data';
import { useEffect, useState, useContext } from 'react';
import { NavContext } from '../components/DrawerContext';

export function ProductDetails() {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [product, setProduct] = useState<Product>();
  const { closeNavDrawer } = useContext(NavContext);

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

  const { brand, name, amount, image, details } = product;
  return (
    <div onClick={closeNavDrawer} className="container">
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
        <div className="mx-6">
          <h1 className="text-3xl font-bold">Details</h1>
          <p className="whitespace-normal">{details}</p>
          <h3 className="text-xl mt-10 mb-5">sizes</h3>
          <ul className="flex flex-wrap justify-between lg:justify-around">
            <li>
              <Size size={8} />
            </li>
            <li>
              <Size size={8.5} />
            </li>
            <li>
              <Size size={9} />
            </li>
            <li>
              <Size size={9.5} />
            </li>
            <li>
              <Size size={10} />
            </li>
            <li>
              <Size size={10.5} />
            </li>
            <li>
              <Size size={11} />
            </li>
            <li>
              <Size size={11.5} />
            </li>
            <li>
              <Size size={12} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Size({ size }) {
  return (
    <div className="bg-black w-10 flex justify-center border-2 hover:bg-white hover:border-black">
      {size}
    </div>
  );
}
