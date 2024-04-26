import { FaPlus, FaMinus } from 'react-icons/fa';
import { toDollars } from '../library/to-dollars';
import { CartContext, CartProduct } from './CartContext';
import { useContext } from 'react';

type Props = {
  isItOpen: boolean;
  close: () => void;
};

export function CartDrawer({ isItOpen, close }: Props) {
  const { cart, removeFromCart } = useContext(CartContext);

  function handleRemoval(product: CartProduct) {
    removeFromCart(product);
  }

  if (!isItOpen) return null;
  return (
    <>
      <div className="fixed right-0 top-0 h-screen bg-secondary text-primary flex flex-col z-10">
        <div className="p-4">
          <h1 className="font-zen text-3xl">Shopping Cart</h1>{' '}
          <button className="mx-4" onClick={close}>
            Close
          </button>
        </div>
        {cart.map((p) => (
          <div key={p?.item?.productId} className="p-4">
            <img className="object-contain w-60" src={p?.item?.image} />
            <div className="flex mt-4 justify-evenly">
              <h3>{p?.item?.brand}</h3>
              <h3>{p?.item?.name}</h3>
              <h3>{toDollars(p?.item?.amount)}</h3>
            </div>
            <div>
              <p>{p?.size}</p>
            </div>
            <div className="flex items-center mt-2">
              <FaMinus
                className="ml-6 mr-4 cursor-pointer"
                onClick={() => handleRemoval(p)}
              />
              <h3 className="text-lg">{p?.quantity}</h3>
              <FaPlus className="ml-4 cursor-pointer" />
            </div>
          </div>
        ))}
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
