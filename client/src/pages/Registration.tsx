import { useContext } from 'react';
import { NavContext } from '../components/DrawerContext';

export function Registration() {
  const { closeNavDrawer } = useContext(NavContext);
  return <div onClick={closeNavDrawer}></div>;
}
