type Props = {
  isItOpen: boolean;
  close: () => void;
};

export function CartDrawer({ isItOpen, close }: Props) {
  return (
    <>
      {isItOpen && (
        <>
          <div className="fixed right-0 top-0 h-screen bg-secondary text-primary z-10">
            <div>
              <div>
                <button onClick={close}>Close</button>
              </div>
              <div className="">
                <h1 className="font-zen text-3xl">Shopping Cart</h1>
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
