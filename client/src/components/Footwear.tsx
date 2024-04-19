import { Link } from 'react-router-dom';

type Footwear = {
  isOpen: boolean;
};

export function Footwear({ isOpen }: Footwear) {
  return (
    <>
      {isOpen && (
        <div>
          <ul className="ml-3 cursor-pointer">
            <li>
              <Link to="/catalog">Shop all</Link>
            </li>
            <li>
              <Link to="/catalog?style=sneakers">Sneakers</Link>
            </li>
            <li>
              <Link to="/catalog?style=boots">Boots</Link>
            </li>
            <li>
              <Link to="/catalog?style=loafers">Loafers</Link>
            </li>
            <li>
              <Link to="/catalog?style=sandals"> Sandals</Link>
            </li>
            <li>
              <Link to="/catalog?style=dress">Dress shoes</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
