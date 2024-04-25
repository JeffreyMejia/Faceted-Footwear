import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';

type Props = {
  isItOpen: boolean;
  close: () => void;
};

export function SearchDrawer({ isItOpen, close }: Props) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/catalog?q=${searchValue}`);
  }

  return (
    <>
      {isItOpen && (
        <>
          <div className="fixed top-0 left-0 right-0 w-screen h-28  bg-secondary text-primary flex flex-col items-center z-10">
            <div className="ml-5 mt-7">
              <h1 className="text-primary font-bold text-3xl mb-2">Search</h1>
            </div>
            <div className="flex items-center justify-center">
              <button className="mr-4" onClick={close}>
                Close
              </button>
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  className="rounded"
                  type="text"
                  placeholder="search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div
            onClick={close}
            className={`shade ${
              isItOpen ? 'is-drawn' : ''
            } w-screen h-screen bg-black opacity-0 absolute top-0 right-0 left-[-10] `}
          />
        </>
      )}
    </>
  );
}
