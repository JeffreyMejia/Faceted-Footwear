import { FaPlus, FaMinus } from 'react-icons/fa';
import { toDollars } from '../library/to-dollars';
import { CartContext } from './CartContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  isItOpen: boolean;
  close: () => void;
};

export function CartDrawer({ isItOpen, close }: Props) {
  const { cart, removeFromCart, incrementProductInCart } =
    useContext(CartContext);

  if (!isItOpen) return null;
  return (
    <>
      <div className="fixed right-0 top-0 h-screen bg-secondary text-primary flex flex-col z-10 overflow-y-auto">
        <div className="p-4 border-b-2 border-primary rounded">
          <h1 className="font-zen text-3xl">Shopping Cart</h1>{' '}
          <button className="mx-4" onClick={close}>
            Close
          </button>
        </div>
        {cart.map((p) => (
          <div key={`${p.productId} + ${p.size}`} className="p-4">
            <img className="object-contain w-60" src={p.image} />
            <div className="flex mt-4 justify-evenly">
              <h3>{`${p.brand} ${p.name}`}</h3>
            </div>
            <div className="flex justify-around">
              <h3>{toDollars(p.amount * p?.quantity)}</h3>
              <p>{p?.size}</p>
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
          </div>
        ))}
        {cart.length !== 0 && (
          <Link to={'/checkout'}>
            <button className="my-4 bg-black rounded w-full hover:bg-primary hover:text-black active:bg-secondary active:text-tertiary">
              Go to Checkout
            </button>
          </Link>
        )}
      </div>
      <div
        onClick={close}
        className={`shade ${
          isItOpen ? 'is-drawn' : ''
        } w-screen h-screen bg-black opacity-0 absolute top-0 right-0 `}
      />
    </>
  );
}
