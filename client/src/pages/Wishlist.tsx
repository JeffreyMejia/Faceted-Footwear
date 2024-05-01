import { useContext } from 'react';
import { WishlistContext } from '../components/WishlistContext';
import { toDollars } from '../library/to-dollars';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

export function Wishlist() {
  const { removeFromWishlist } = useContext(WishlistContext);

  const { wishlist } = useContext(WishlistContext);
  return (
    <div className="container">
      <div className="text-primary flex justify-center mt-4">
        <h1 className="font-zen text-4xl">Wishlist</h1>
      </div>
      <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
        {wishlist.map((product) => (
          <div
            key={product?.item.productId}
            className="bg-tertiary rounded p-2 shadow-wrapper hover:bg-black">
            <Link to={`/details/${product.item.productId}`}>
              <img
                className="h-36  md:h-52 lg:h-52 w-full rounded shadow-md"
                src={product.item.image}
                alt={product.item.name}
              />
            </Link>
            <div className="flex mt-2">
              <h2 className="text-white mr-2">{`${product.item.brand} ${product.item.name}`}</h2>
            </div>
            <h3 className="text-white font-bold">
              {toDollars(product.item.amount)}
            </h3>
            <FaTrash
              onClick={() => removeFromWishlist(product)}
              className="fill-secondary hover:fill-primary cursor-pointer active:fill-tertiary mt-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
