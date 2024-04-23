import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { NavContext } from './DrawerContext';
type BrandProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Brand({ isOpen, onClose }: BrandProps) {
  const { closeNavDrawer } = useContext(NavContext);

  return (
    <>
      {isOpen && (
        <ul className="ml-3 cursor-pointer" onClick={closeNavDrawer}>
          <li>
            <Link onClick={onClose} to="/catalog?brand=Adidas">
              Adidas
            </Link>
          </li>
          <li>
            <Link onClick={onClose} to="/catalog?brand=Asics">
              Asics
            </Link>
          </li>
          <li>
            <Link onClick={onClose} to="/catalog?brand=Birkenstock">
              Birkenstock
            </Link>
          </li>
          <li>
            <Link onClick={onClose} to="/catalog?brand=Brador">
              Brador
            </Link>
          </li>
          <li>
            <Link onClick={onClose} to="/catalog?brand=Grant Stone">
              Grant Stone
            </Link>
          </li>
          <li>
            <Link onClick={onClose} to="/catalog?brand=Jim Green">
              Jim Green
            </Link>
          </li>
          <li>
            <Link onClick={onClose} to="/catalog?brand=Jordan">
              Jordan
            </Link>
          </li>
          <li>
            <Link onClick={onClose} to="/catalog?brand=Nike">
              Nike
            </Link>
          </li>
          <li>
            <Link onClick={onClose} to="/catalog?brand=Reebok">
              Reebok
            </Link>
          </li>
          <li>
            <Link onClick={onClose} to="/catalog?brand=Solovair">
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
