import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { readBrands } from '../library/data';

type Brands = {
  brand: string;
};

type BrandProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Brand({ isOpen }: BrandProps) {
  const [brands, setBrands] = useState<Brands[]>([]);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function load() {
      try {
        const brands = await readBrands();
        setBrands(brands);
        console.log(brands);
      } catch (error) {
        setError(error);
      }
    }
    load();
  }, []);

  if (error) {
    return (
      <div className="text-primary">
        Error Loading brands:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <>
      {isOpen && (
        <ul className="ml-3 cursor-pointer">
          {brands.map((brand) => (
            <li key={brand.brand}>
              <Link to={`/catalog?brand=${brand.brand}`}>{brand.brand}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
