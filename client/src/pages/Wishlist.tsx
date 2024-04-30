export function Wishlist() {
  return (
    <div className="container">
      <div className="text-primary flex justify-center mt-4">
        <h1 className="font-zen text-4xl">Wishlist</h1>
      </div>
      <div>
        {/* here */}
        <Link key={product?.productId} to={`/details/${product.productId}`}>
          <div className="bg-tertiary rounded p-2 shadow-wrapper hover:bg-black">
            <img
              className="h-36  md:h-52 lg:h-52 w-full rounded shadow-md"
              src={product.image}
              alt={product.name}
            />
            <div className="flex mt-2">
              <h2 className="text-white mr-2">{product.brand}</h2>
              <h2 className="text-white">{product.name}</h2>
            </div>
            <h3 className="text-white font-bold">
              {toDollars(product.amount)}
            </h3>
          </div>
        </Link>
        {/* here */}
      </div>
    </div>
  );
}
