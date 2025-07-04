import React, { useCallback, useContext, type FC } from 'react';
import { GlobalContext } from './ContextoGlobal';

export const Login: FC<{
  handleLogin: () => void;
  handleLogout: () => void;
}> = ({ handleLogin, handleLogout }) => {
  const props = useContext(GlobalContext);

  const { token } = props!;

  const handleLoginInternal = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      console.log('login');
      handleLogin();
    },
    [handleLogin]
  );

  const handleLogoutInternal = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      console.log('logout');
      handleLogout();
    },
    [handleLogout]
  );

  return token ? (
    <button onClick={handleLogoutInternal}>Logout</button>
  ) : (
    <button onClick={handleLoginInternal}>Login</button>
  );
};
