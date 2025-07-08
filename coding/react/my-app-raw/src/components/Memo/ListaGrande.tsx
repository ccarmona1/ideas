import type { FC } from 'react';

export const ListaGrande: FC<{ items: string[] }> = ({ items }) => {
  return (
    <div>
      <h2>Lista Grande</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
