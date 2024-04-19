import { useState } from 'react';
import { FaCube, FaPlus, FaMinus } from 'react-icons/fa';

type Props = {
  isOpen: boolean;
  open: () => void;
};

export function NavDrawer({ isOpen, open }: Props) {
  const [openFootwear, setOpenFootwear] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 h-screen flex bg-secondary flex-col text-primary">
          <div className="flex bg-secondary h-full items-center p-4 ">
            <h1 className="text-primary font-bold text-lg">Faceted Footwear</h1>
            <FaCube className="text-primary ml-3 h-7 w-7 hover:animate-spin active:animate-bounce" />
          </div>
          <button onClick={open} className="text-white">
            Close
          </button>
          <input type="text" className="rounded" placeholder="search..." />
          <h1>Shop by</h1>
          <div className="flex items-center justify-between">
            <h2>Footwear</h2>
            {openFootwear === false ? (
              <FaPlus
                onClick={() => setOpenFootwear(!openFootwear)}
                className="mr-3 cursor-pointer"
              />
            ) : (
              <FaMinus
                onClick={() => setOpenFootwear(!openFootwear)}
                className="mr-3 cursor-pointer"
              />
            )}
          </div>
          <Footwear isOpen={openFootwear} />
          <div className="flex items-center justify-between">
            <h2>Brand</h2>
            {openBrand === false ? (
              <FaPlus
                onClick={() => setOpenBrand(!openBrand)}
                className="mr-3 cursor-pointer"
              />
            ) : (
              <FaMinus
                onClick={() => setOpenBrand(!openBrand)}
                className="mr-3 cursor-pointer"
              />
            )}
          </div>
          <Brand isOpen={openBrand} />
          <h2>Account</h2>
        </div>
      )}
    </>
  );
}

type Footwear = {
  isOpen: boolean;
};

function Footwear({ isOpen }: Footwear) {
  return (
    <>
      {isOpen && (
        <div>
          <ul className="ml-3 cursor-pointer">
            <li>Shop all</li>
            <li>Sneakers</li>
            <li>Boots</li>
            <li>Loafers</li>
            <li>Sandals</li>
            <li>Dress shoes</li>
          </ul>
        </div>
      )}
    </>
  );
}

type BrandProps = {
  isOpen: boolean;
};
function Brand({ isOpen }: BrandProps) {
  return (
    <>
      {isOpen && (
        <ul className="ml-3 cursor-pointer">
          <li>Adidas</li>
          <li>Asics</li>
          <li>Birkenstock</li>
          <li>Brador</li>
          <li>Grant Stone</li>
          <li>Jim Green</li>
          <li>Jordan</li>
          <li>Nike</li>
          <li>Reebok</li>
          <li>Solovair</li>
          <li>White's</li>
        </ul>
      )}
    </>
  );
}
