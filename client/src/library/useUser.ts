import { useContext } from 'react';
import { AppContext, AppContextValues } from '../components/UserContext';

export function useUser(): AppContextValues {
  const values = useContext(AppContext);
  if (!values) throw new Error('useUser must be used inside a UserProvider');
  return values;
}
