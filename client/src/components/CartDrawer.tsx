import { FaPlus, FaMinus } from 'react-icons/fa';
import { toDollars } from '../library/to-dollars';

type Props = {
  isItOpen: boolean;
  close: () => void;
};

export function CartDrawer({ isItOpen, close }: Props) {
  return (
    <>
      {isItOpen && (
        <>
          <div className="fixed right-0 top-0 h-screen bg-secondary text-primary flex flex-col z-10">
            <div className="p-4">
              <h1 className="font-zen text-3xl">Shopping Cart</h1>{' '}
              <button className="mx-4" onClick={close}>
                Close
              </button>
            </div>
            <div className="p-4">
              <img
                className="object-contain w-60"
                src="/final-project-photos/Nike - Air Max 1.png"
              />
              <div className="flex mt-4 justify-evenly">
                <h3>Nike</h3>
                <h3>Air Max 1</h3>
                <h3>{toDollars(14999)}</h3>
              </div>
              <div className="flex items-center mt-2">
                <FaMinus className="ml-6 mr-4" />
                <h3 className="text-lg">3</h3>
                <FaPlus className="ml-4" />
              </div>
            </div>
          </div>
          <div
            onClick={close}
            className={`shade ${
              isItOpen ? 'is-drawn' : ''
            } w-screen h-screen bg-black opacity-0 absolute top-0 right-0 `}
          />
        </>
      )}
    </>
  );
}
