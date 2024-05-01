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

export function Brand({ isOpen, onClose }: BrandProps) {
  const [brands, setBrands] = useState<Brands[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const brands = await readBrands();
        setBrands(brands);
        console.log(brands);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, []);

  return (
    <>
      {isOpen && (
        <ul className="ml-3 cursor-pointer">
          {brands.map((brand) => (
            <li key={brand.brand}>
              <Link onClick={onClose} to={`/catalog?brand=${brand.brand}`}>
                {brand.brand}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
