import { useMemo, useReducer, type FC } from 'react';
import { GlobalContext, type User, type UserAction } from './GlobalContext';
import { Login } from './Login';

const isUser = (user: Partial<User>): user is User => {
  return user && typeof user.logged === 'boolean';
};

export const Main: FC = () => {
  const user = useMemo(() => {
    const token = localStorage.getItem('token');
    const parsedUser = token ? JSON.parse(token) : undefined;
    return isUser(parsedUser) ? parsedUser : undefined;
  }, []);

  const [userState, dispatch] = useReducer(
    (state: User | undefined, action: UserAction): User | undefined => {
      if (action.type === 'login') {
        return { logged: true, ...action.user };
      }
      if (action.type === 'logout') {
        return undefined;
      }
      return state;
    },
    user || { logged: false }
  );

  return (
    <GlobalContext.Provider value={{ user: userState, dispatch }}>
      <Login></Login>
    </GlobalContext.Provider>
  );
};
