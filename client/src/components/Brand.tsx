import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { NavContext } from './DrawerContext';
type BrandProps = {
  isOpen: boolean;
  handleClosing: () => void;
};

export function Brand({ isOpen, handleClosing }: BrandProps) {
  const { closeNavDrawer } = useContext(NavContext);

  return (
    <>
      {isOpen && (
        <ul className="ml-3 cursor-pointer" onClick={closeNavDrawer}>
          <li>
            <Link onClick={handleClosing} to="/catalog?brand=Adidas">
              Adidas
            </Link>
          </li>
          <li>
            <Link onClick={handleClosing} to="/catalog?brand=Asics">
              Asics
            </Link>
          </li>
          <li>
            <Link onClick={handleClosing} to="/catalog?brand=Birkenstock">
              Birkenstock
            </Link>
          </li>
          <li>
            <Link onClick={handleClosing} to="/catalog?brand=Brador">
              Brador
            </Link>
          </li>
          <li>
            <Link onClick={handleClosing} to="/catalog?brand=Grant Stone">
              Grant Stone
            </Link>
          </li>
          <li>
            <Link onClick={handleClosing} to="/catalog?brand=Jim Green">
              Jim Green
            </Link>
          </li>
          <li>
            <Link onClick={handleClosing} to="/catalog?brand=Jordan">
              Jordan
            </Link>
          </li>
          <li>
            <Link onClick={handleClosing} to="/catalog?brand=Nike">
              Nike
            </Link>
          </li>
          <li>
            <Link onClick={handleClosing} to="/catalog?brand=Reebok">
              Reebok
            </Link>
          </li>
          <li>
            <Link onClick={handleClosing} to="/catalog?brand=Solovair">
              Solovair
            </Link>
          </li>
          <li>
            <Link to="/catalog?brand=Whites">White's</Link>
          </li>
        </ul>
      )}
    </>
  );
}
