import React from 'react';

export const Header: React.FunctionComponent = () => {
  return (
    <header
      style={{
        background: '#222',
        color: '#fff',
        padding: '1rem',
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
      }}
    >
      Tester app
    </header>
  );
};
export default Header;
