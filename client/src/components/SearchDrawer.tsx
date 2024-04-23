import { ChangeEvent } from 'react';

type Props = {
  isItOpen: boolean;
  close: () => void;
  value: string;
  search: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function SearchDrawer({ isItOpen, close, value, search }: Props) {
  return (
    <>
      {isItOpen && (
        <div className="fixed top-0 left-0 right-0 w-screen h-28  bg-secondary text-primary flex flex-col items-center">
          <div className="ml-5 mt-7">
            <h1 className="text-primary font-bold text-3xl mb-2">Search</h1>
          </div>
          <div className="ml-5">
            <button className="mr-4" onClick={close}>
              Close
            </button>
            <input
              className="rounded"
              type="text"
              placeholder="search..."
              value={value}
              onChange={(e) => search(e)}
            />
          </div>
        </div>
      )}
    </>
  );
}
