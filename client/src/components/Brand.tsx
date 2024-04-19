import { Link } from 'react-router-dom';
type BrandProps = {
  isOpen: boolean;
};

export function Brand({ isOpen }: BrandProps) {
  return (
    <>
      {isOpen && (
        <ul className="ml-3 cursor-pointer">
          <li>
            <Link to="/catalog?brand=Adidas">Adidas</Link>
          </li>
          <li>
            <Link to="/catalog?brand=Asics">Asics</Link>
          </li>
          <li>
            <Link to="/catalog?brand=Birkenstock">Birkenstock</Link>
          </li>
          <li>
            <Link to="/catalog?brand=Brador">Brador</Link>
          </li>
          <li>
            <Link to="/catalog?brand=Grant Stone">Grant Stone</Link>
          </li>
          <li>
            <Link to="/catalog?brand=Jim Green">Jim Green</Link>
          </li>
          <li>
            <Link to="/catalog?brand=Jordan">Jordan</Link>
          </li>
          <li>
            <Link to="/catalog?brand=Nike">Nike</Link>
          </li>
          <li>
            <Link to="/catalog?brand=Reebok">Reebok</Link>
          </li>
          <li>
            <Link to="/catalog?brand=Solovair">Solovair</Link>
          </li>
          <li>
            <Link to="/catalog?brand=Whites">White's</Link>
          </li>
        </ul>
      )}
    </>
  );
}
