import { toDollars } from '../library/to-dollars';
import { useParams, useNavigate } from 'react-router-dom';
import { readProduct, type Product } from '../library/data';
import { useEffect, useState, useContext, FormEvent } from 'react';
import { CartContext } from '../components/CartContext';
import { FaBookmark } from 'react-icons/fa';
import { WishlistContext } from '../components/WishlistContext';

export function ProductDetails() {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [product, setProduct] = useState<Product>();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProduct(productId: number) {
      try {
        const product = await readProduct(productId);
        if (!product) throw new Error(`Entry with ID ${productId} not found`);
        setProduct(product);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct(Number(productId));
  }, [productId]);

  const exists = wishlist.find(
    (item) => item.item?.productId === product?.productId
  );

  async function handleAddToWishlist(item: Product) {
    addToWishlist(item);
    navigate('/wishlist');
  }

  async function handleAddToCart(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    try {
      event.preventDefault();
      if (!product) throw new Error('you broke something');
      const formData = new FormData(event.currentTarget);
      const formValues = Object.fromEntries(formData);
      addToCart(product, +formValues.sizes);
      alert(`${product.name} added to cart`);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  if (isLoading) return <div>Loading...</div>;
  if (error || !product) {
    return (
      <div className="text-primary">
        Error Loading product:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }
  const { brand, name, amount, image, details } = product;
  return (
    <div className="container mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-secondary rounded shadow-wrapper p-4 lg:w-10/12 lg:h-5/6">
        <div className="ml-3">
          <img
            className="rounded mt-3 lg:aspect-square"
            src={image}
            alt={name}
          />
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold my-3 text-tertiary">{`${brand} ${name}`}</h1>
          <h3 className="text-primary">{toDollars(amount)}</h3>
          <span>
            {!exists && (
              <>
                <p className="text-primary">add to wishlist</p>
                <FaBookmark
                  onClick={() => handleAddToWishlist(product)}
                  className="fill-primary my-2 cursor-pointer"
                />
              </>
            )}
          </span>
        </div>
        <div className="ml-6 mt-3">
          <h1 className="text-3xl font-zen text-tertiary">Details</h1>
          <p className="whitespace-normal text-primary">{details}</p>
          <h3 className="text-xl mt-10 mb-5 text-primary">Choose your size</h3>
          <form onSubmit={handleAddToCart}>
            <label>
              <select name="sizes" id="size-select">
                <option defaultValue={'select-size'}>select-size</option>
                {sizes.map((size) => (
                  <Size key={size} size={size}></Size>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="bg-tertiary text-black hover:text-white rounded p-1 ml-2">
              Add to cart
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const sizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];

function Size({ size }) {
  return (
    <option value={size} className="bg-black text-primary">
      {size}
    </option>
  );
}
