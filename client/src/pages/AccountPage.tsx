import { Link } from 'react-router-dom';

export function AccountPage() {
  return (
    <div className="container flex flex-col items-center mt-6">
      <div className="bg-secondary sm:6/12 md:6/12 lg:w-3/12 rounded p-4 shadow-wrapper text-primary flex flex-col items-center">
        <h1 className="text-3xl font-zen  text-center">My Account</h1>
        <h3 className="my-2">Order History</h3>
        <Link className="my-2" to={'/wishlist'}>
          Wishlist
        </Link>
      </div>
    </div>
  );
}
