import { FormEvent, useState } from 'react';
import { FaCube, FaPlus, FaMinus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Footwear } from './Footwear';
import { Brand } from './Brand';
import { User } from './UserContext';

type Props = {
  isItOpen: boolean;
  close: () => void;
  user: User | undefined;
};

export function NavDrawer({ isItOpen, close, user }: Props) {
  const [openFootwear, setOpenFootwear] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/catalog?q=${searchValue}`);
    setSearchValue('');
  }

  if (!isItOpen) return null;
  return (
    <>
      <div className="fixed left-0 top-0 h-screen bg-secondary text-primary z-10 overflow-y-auto">
        <div className="flex flex-col">
          <div className="flex h-full items-center p-4 my-4 border-b-2 border-primary rounded">
            <button onClick={close} className="text-primary mx-4">
              Close
            </button>
            <h1 className="text-primary text-lg md:text-xl lg:text-2xl font-zen">
              Faceted Footwear
            </h1>
            <FaCube
              onClick={() => navigate('/')}
              className="text-primary ml-3 h-7 w-7 hover:animate-spin active:animate-bounce"
            />
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className="rounded"
              type="text"
              placeholder="search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
          <Link className="mt-2" to="/catalog">
            Shop all
          </Link>
          <div className="flex items-center justify-between ">
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
          <div>
            <Brand
              isOpen={openBrand}
              onClose={() => setOpenBrand(!openBrand)}
            />
          </div>
          <h2
            className="cursor-pointer"
            onClick={() =>
              user === undefined
                ? navigate('/registration')
                : navigate('/account')
            }>
            Account
          </h2>
        </div>
      </div>
      <div
        onClick={close}
        className={`shade ${
          isItOpen ? 'is-drawn' : ''
        } w-screen h-screen bg-black opacity-0 absolute top-0 left-0`}
      />
    </>
  );
}
