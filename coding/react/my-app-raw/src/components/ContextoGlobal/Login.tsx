import { useCallback, useContext, type FC } from 'react';
import { GlobalContext } from './GlobalContext';

export const Login: FC = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('Login must be used within a GlobalContext.Provider');
  }

  const { user, dispatch } = context;

  const handleLogin = useCallback(() => {
    const user = { logged: true, name: 'John Doe' };
    localStorage.setItem('token', JSON.stringify(user));
    dispatch({ type: 'login', user });
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    dispatch({ type: 'logout' });
  }, [dispatch]);

  return (
    <>
      {user?.logged ? (
        <>
          {JSON.stringify(user)}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </>
  );
};
