import { useState, ChangeEvent } from 'react';
import { FaCube, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Footwear } from './Footwear';
import { Brand } from './Brand';

type Props = {
  isOpen: boolean;
  close: () => void;
  value: string;
  search: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function NavDrawer({ isOpen, close, value, search }: Props) {
  const [openFootwear, setOpenFootwear] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 h-screen bg-secondary flex flex-col text-primary ">
          <div className="flex bg-secondary h-full items-center p-4">
            <button onClick={close} className="text-primary mx-4">
              Close
            </button>
            <h1 className="text-primary font-bold text-lg">Faceted Footwear</h1>
            <FaCube
              onClick={() => navigate('/')}
              className="text-primary ml-3 h-7 w-7 hover:animate-spin active:animate-bounce"
            />
          </div>
          <input
            type="text"
            className="rounded"
            placeholder="search..."
            value={value}
            onChange={(e) => search(e)}
          />
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
          <Footwear
            isOpen={openFootwear}
            handleClose={() => setOpenFootwear(!openFootwear)}
          />
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
          <Brand isOpen={openBrand} onClose={() => setOpenBrand(!openBrand)} />
          <h2>Account</h2>
        </div>
      )}
    </>
  );
}
