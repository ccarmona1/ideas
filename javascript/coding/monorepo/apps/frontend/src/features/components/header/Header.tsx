import React from 'react';

export const Header: React.FC = () => {
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
      role="banner"
      aria-label="Encabezado principal"
    >
      Tester app
    </header>
  );
};

export default Header;
