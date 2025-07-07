import { createContext, type Dispatch } from 'react';

export interface User {
  logged: boolean;
}

export interface UserAction {
  type: 'login' | 'logout';
  user?: Partial<User>;
}

export const GlobalContext = createContext<
  | {
      user: User | undefined;
      dispatch: Dispatch<UserAction>;
    }
  | undefined
>(undefined);
