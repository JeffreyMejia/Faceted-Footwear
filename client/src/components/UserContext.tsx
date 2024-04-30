import { createContext } from 'react';

export type User = {
  userId: number;
  email: string;
};

export type AppContextValues = {
  user: User | undefined;
  token: string | undefined;
  handleSignIn: (user: User, token: string) => void;
  handleSignOut: () => void;
};

export const AppContext = createContext<AppContextValues>({
  user: undefined,
  token: undefined,
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
});
