import { Carousel } from '../components/Carousel';
import { useContext } from 'react';
import { NavContext } from '../components/DrawerContext';

export function Home() {
  const { closeNavDrawer } = useContext(NavContext);
  return (
    <div onClick={closeNavDrawer}>
      <h3 className="font-bold text-3xl text-primary my-3 text-center">
        Shop our latest offerings!
      </h3>
      <Carousel />
    </div>
  );
}
