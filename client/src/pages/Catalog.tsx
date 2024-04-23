import { toDollars } from '../library/to-dollars';
import { useState, useEffect, useContext } from 'react';
import { Product } from '../library/data';
import { useSearchParams, Link } from 'react-router-dom';
import { NavContext } from '../components/DrawerContext';

export function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [searchParams] = useSearchParams();
  const { closeNavDrawer } = useContext(NavContext);

  useEffect(() => {
    async function getStyle() {
      try {
        const style = searchParams.get('style');
        const query = style ? `?style=${style}` : '';
        const response = await fetch(`/api/catalog${query}`);
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

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div className="text-primary">
        Error Loading catalog:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <div onClick={closeNavDrawer} className="container">
      <h1 className="font-bold text-5xl text-tertiary my-6">Catalog</h1>
      <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 cursor-pointer">
        {products.map((product) => (
          <Link key={product?.productId} to={`/details/${product.productId}`}>
            <div className="bg-tertiary rounded flex flex-wrap justify-center p-2 shadow-wrapper hover:bg-black">
              <img
                className="h-36  md:h-52 lg:h-52 w-full rounded shadow-md"
                src={product.image}
                alt={product.name}
              />
              <h2 className="text-white mr-4">{product.brand}</h2>
              <h2 className="text-white mr-4">{product.name}</h2>
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
