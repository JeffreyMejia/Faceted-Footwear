import { useContext } from 'react';
import { WishlistContext } from '../components/WishlistContext';
import { toDollars } from '../library/to-dollars';
import { Link } from 'react-router-dom';

export function Wishlist() {
  const { wishlist } = useContext(WishlistContext);
  return (
    <div className="container">
      <div className="text-primary flex justify-center mt-4">
        <h1 className="font-zen text-4xl">Wishlist</h1>
      </div>
      <div>
        {wishlist.map((product) => (
          <Link
            key={product?.item.productId}
            to={`/details/${product.item.productId}`}>
            <div className="bg-tertiary rounded p-2 shadow-wrapper hover:bg-black">
              <img
                className="h-36  md:h-52 lg:h-52 w-full rounded shadow-md"
                src={product.item.image}
                alt={product.item.name}
              />
              <div className="flex mt-2">
                <h2 className="text-white mr-2">{product.item.brand}</h2>
                <h2 className="text-white">{product.item.name}</h2>
              </div>
              <h3 className="text-white font-bold">
                {toDollars(product.item.amount)}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
