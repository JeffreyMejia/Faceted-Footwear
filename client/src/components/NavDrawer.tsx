import { FaCube, FaPlus } from 'react-icons/fa';

type Props = {
  isOpen: boolean;
  open: () => void;
};

export function NavDrawer({ isOpen, open }: Props) {
  return (
    <div className="container">
      {isOpen && (
        <div className="fixed left-0 top-0 h-screen flex bg-secondary items-center">
          <button onClick={open} className="text-white">
            Close
          </button>
          <div className="flex bg-secondary h-full items-center p-4">
            <h1 className="text-primary font-bold text-lg">Faceted Footwear</h1>
            <FaCube className="text-primary ml-3 h-7 w-7 hover:animate-spin" />
          </div>
          <input type="text" className="rounded" placeholder="search..." />
          <div>
            <h2>Footwear</h2>
            <FaPlus />
          </div>
          <h2>Account</h2>
        </div>
      )}
    </div>
  );
}
