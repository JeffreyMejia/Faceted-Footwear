import { toDollars } from '../library/to-dollars';
import { useState, useEffect } from 'react';
import { Product } from '../library/data';
import { useSearchParams, Link } from 'react-router-dom';

export function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function getStyle() {
      try {
        const style = searchParams.get('style');
        const q = searchParams.get('q');
        const query = q ? `/search?q=${q}` : '';
        const styleQuery = style ? `?style=${style}` : '';
        const newQuery = styleQuery ? styleQuery : query;
        const response = await fetch(`/api/catalog${newQuery}`);
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

  if (isLoading) return <div className="tex-primary">Loading...</div>;
  if (error) {
    return (
      <div className="text-primary">
        Error Loading catalog:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="font-bold text-xl md:text-3xl lg:text-5xl text-tertiary my-6">
        Catalog
      </h1>
      <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 cursor-pointer">
        {products.map((product) => (
          <Link key={product?.productId} to={`/details/${product.productId}`}>
            <div className="bg-tertiary rounded p-2 shadow-wrapper hover:bg-black">
              <img
                className="h-36  md:h-52 lg:h-52 w-full rounded shadow-md"
                src={product.image}
                alt={product.name}
              />
              <div className="flex mt-2">
                <h2 className="text-white mr-2">{product.brand}</h2>
                <h2 className="text-white">{product.name}</h2>
              </div>
              <h3 className="text-white font-bold">
                {toDollars(product.amount)}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
