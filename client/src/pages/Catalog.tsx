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
        const brand = searchParams.get('brand');
        const q = searchParams.get('q');
        const brandQuery = brand ? `?brand=${brand}` : '';
        const query = q ? `/search?q=${q}` : '';
        const styleQuery = style ? `?style=${style}` : '';
        const brandOrStyleQuery = styleQuery ? styleQuery : brandQuery;
        const newQuery = brandOrStyleQuery ? brandOrStyleQuery : query;
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
      <div className="border-b-4 rounded border-primary mb-6">
        <h1 className="font-zen text-xl md:text-3xl lg:text-5xl text-tertiary my-6">
          Catalog
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 cursor-pointer">
        {products.map((product) => (
          <Link key={product?.productId} to={`/details/${product.productId}`}>
            <div className="bg-tertiary rounded p-2 shadow-wrapper hover:bg-black">
              <img
                className="rounded shadow-md aspect-square w-full"
                src={product.image}
                alt={product.name}
              />
              <div className="flex mt-2">
                <h2 className="text-white mr-2">{`${product.brand} ${product.name}`}</h2>
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
