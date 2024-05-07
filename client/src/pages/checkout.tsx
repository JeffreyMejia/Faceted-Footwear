import { CartContext, CartProduct } from '../components/CartContext';
import { useContext, useEffect } from 'react';
import { toDollars } from '../library/to-dollars';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function Checkout() {
  const { cart, incrementProductInCart, removeFromCart, checkout } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/catalog');
    }
  });

  let sum = 0;
  cart.forEach((p) => (sum += p.amount * p.quantity));

  async function handlePurchase(cart: CartProduct[]) {
    try {
      checkout(cart);
      navigate('/catalog');
      alert('Thank you for your purchase!');
    } catch (error) {
      console.error('something went wrong');
    }
  }

  return (
    <div className="container flex justify-center mt-10">
      <div className=" bg-secondary text-primary w-10/12 md:w-8/12 lg:w-6/12 ">
        {cart.map((p) => (
          <div
            key={`${p.productId} + ${p.size}`}
            className="p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-5 lg:gap-5">
            <div>
              <img className="object-contain w-60 rounded" src={p.image} />
            </div>
            <div className="flex mt-4 ">
              <h3>{`${p.brand} ${p.name}`}</h3>
              <p className="ml-4">{p?.size}</p>
            </div>
            <div className="flex items-center mt-2">
              <FaMinus
                className="ml-6 mr-4 cursor-pointer"
                onClick={() => removeFromCart(p)}
              />
              <h3 className="text-lg">{p?.quantity}</h3>
              <FaPlus
                onClick={() => incrementProductInCart(p)}
                className="ml-4 cursor-pointer"
              />
            </div>
            <h3>{toDollars(p.amount * p?.quantity)}</h3>
          </div>
        ))}
        <div className="ml-5">
          <p>{`Your total: ${toDollars(sum)} `}</p>
          <button
            onClick={() => handlePurchase(cart)}
            className="my-4 bg-black rounded w-3/12 hover:bg-primary hover:text-black active:bg-secondary active:text-tertiary">
            purchase
          </button>
        </div>
      </div>
    </div>
  );
}
