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
      <div className="text-primary flex flex-col justify-center items-center mt-4">
        <div>
          <h1 className="font-zen text-4xl">Wishlist</h1>
        </div>
        {wishlist.length === 0 && (
          <h1 className="text-primary text-xl mt-10">
            You currently have no items in your wishlist!
          </h1>
        )}
      </div>
      <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
        {wishlist.map((product) => (
          <div
            key={product?.item.productId}
            className="bg-black rounded p-2 hover:bg-primary hover:scale-105 transition">
            <Link to={`/details/${product.item.productId}`}>
              <img
                className="w-full rounded shadow-md aspect-square "
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
