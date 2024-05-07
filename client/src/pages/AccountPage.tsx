import { Link } from 'react-router-dom';
import { useUser } from '../library/useUser';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { useContext } from 'react';

export function AccountPage() {
  const { handleSignOut } = useUser();
  const navigate = useNavigate();
  const { cartSignOut } = useContext(CartContext);

  function handleSubmit() {
    localStorage.clear();
    handleSignOut();
    alert('You have signed out successfully');
    navigate('/registration');
    cartSignOut();
  }

  return (
    <div className="container flex flex-col items-center mt-6">
      <div className="bg-secondary sm:6/12 md:6/12 lg:w-3/12 rounded p-4 shadow-wrapper text-primary flex flex-col items-center">
        <h1 className="text-3xl font-zen  text-center">My Account</h1>
        <h3 className="my-2">Order History</h3>
        <Link className="my-2" to={'/wishlist'}>
          Wishlist
        </Link>
        <form onSubmit={handleSubmit}>
          <button className=" bg-black rounded w-full hover:bg-primary hover:text-black active:bg-secondary active:text-tertiary p-2">
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
