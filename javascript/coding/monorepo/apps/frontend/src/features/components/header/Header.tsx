import React from 'react';

export const Header: React.FC = () => {
  return (
    <header
      className="header"
      role="banner"
      aria-label="Encabezado principal"
      style={{
        background: 'var(--color-gray-900)',
        color: 'white',
        padding: 'var(--spacing-md)',
        textAlign: 'center',
        fontSize: 'var(--font-size-xl)',
        fontWeight: 'var(--font-weight-semibold)',
      }}
    >
      Tester app
    </header>
  );
};

export default Header;
