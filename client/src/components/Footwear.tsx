import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { NavContext } from './DrawerContext';

type Footwear = {
  isOpen: boolean;
  handleClose: () => void;
};

export function Footwear({ isOpen, handleClose }: Footwear) {
  const { closeNavDrawer } = useContext(NavContext);

  return (
    <>
      {isOpen && (
        <div>
          <ul className="ml-3 cursor-pointer" onClick={closeNavDrawer}>
            <li>
              <Link to="/catalog" onClick={handleClose}>
                Shop all
              </Link>
            </li>
            <li>
              <Link to="/catalog?style=sneakers" onClick={handleClose}>
                Sneakers
              </Link>
            </li>
            <li>
              <Link to="/catalog?style=boots" onClick={handleClose}>
                Boots
              </Link>
            </li>
            <li>
              <Link to="/catalog?style=loafers" onClick={handleClose}>
                Loafers
              </Link>
            </li>
            <li>
              <Link to="/catalog?style=sandals" onClick={handleClose}>
                {' '}
                Sandals
              </Link>
            </li>
            <li>
              <Link to="/catalog?style=dress" onClick={handleClose}>
                Dress shoes
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
