import { useContext } from 'react';
import { closeContext } from '../components/NavDrawerCloseContext';

export function Registration() {
  const { closeNavDrawer } = useContext(closeContext);
  return <div onClick={closeNavDrawer}></div>;
}
