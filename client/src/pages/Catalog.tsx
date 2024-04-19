import { toDollars } from '../library/to-dollars';
import { useState, useEffect } from 'react';
import { Product } from '../library/data';
import { useSearchParams } from 'react-router-dom';

export function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function getStyle() {
      try {
        const style = searchParams.get('style') ?? '';
        const response = await fetch(`/api/catalog?style=${style}`);
        if (!response.ok)
          throw new Error(`Error! bad network request ${response.status}`);
        const catalog = await response.json();
        setProducts(catalog);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getStyle();
  }, [searchParams]);

  // useEffect(() => {
  //   async function readCatalog() {
  //     try {
  //       const response = await fetch('/api/catalog');
  //       if (!response.ok)
  //         throw new Error(`Error! bad network request ${response.status}`);
  //       const catalog = await response.json();
  //       setProducts(catalog);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   readCatalog();
  // }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading catalog:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="font-bold text-5xl text-tertiary my-6">Catalog</h1>
      <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 ">
        {products.map((product) => (
          <div
            key={product?.productId}
            className="bg-tertiary rounded flex flex-wrap justify-center p-2 shadow-wrapper">
            <img
              className="h-36  md:h-52 lg:h-52 w-full rounded shadow-md"
              src={product.image}
              alt="Jordan one"
            />
            <h2 className="text-white mr-4">{product.brand}</h2>
            <h2 className="text-white mr-4">{product.name}</h2>
            <h3 className="text-white font-bold">
              {toDollars(product.amount)}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
