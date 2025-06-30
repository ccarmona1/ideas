import {
  createContext,
  useCallback,
  useReducer,
  useState,
  type FC,
} from 'react';
import { Login } from './Login';

export interface GlobalContextProps {
  token?: string;
  user?: object;
}
// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);

export const ContextoGlobal: FC = () => {
  const currentToken = localStorage.getItem('token');
  const currentUser = currentToken ? JSON.parse(currentToken) : undefined;
  const [token, setToken] = useState<string | undefined>(
    currentToken ?? undefined
  );

  const reducer = (
    userState: object | undefined,
    action: { type: string; payload?: object }
  ) => {
    if (action.type === 'logout') {
      return undefined;
    }
    if (action.type === 'login') {
      return { ...action.payload, logged: true };
    }
    return undefined;
  };

  const [user, dispatch] = useReducer(reducer, currentUser);

  const login = useCallback(() => {
    const newUser = { name: 'crisman' };
    const newToken = JSON.stringify(newUser);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    dispatch({ type: 'login', payload: newUser });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'logout' });
    localStorage.removeItem('token');
    setToken(undefined);
  }, []);

  console.log(JSON.stringify(user));

  return (
    <GlobalContext value={{ token, user }}>
      <Login handleLogin={login} handleLogout={logout}></Login>
      {JSON.stringify(user)}
    </GlobalContext>
  );
};
