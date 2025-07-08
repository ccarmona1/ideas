import React, { useCallback, useMemo, type FC } from 'react';
import { ListaGrande } from './ListaGrande';

const MemoizedListaGrande = React.memo(ListaGrande, (prevProps, nextProps) => {
  // Comparamos las longitudes de los arrays para evitar re-renderizados innecesarios
  return prevProps.items.length === nextProps.items.length;
});

export const Memo: FC = () => {
  const items = useMemo(() => {
    const itemsArray = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
    return itemsArray;
  }, []);

  const [newItems, setItems] = React.useState<string[]>(items);

  const handleClick = useCallback(() => {
    console.log('Lista actualizada');
    setTimeout(() => {
      console.log('Lista actualizada 2 ');
      setItems(
        Array.from({ length: 1000 }, (_, i) => `Item ${i + 1} segunda vez`)
      );
    }, 5000);
  }, [setItems]);

  return (
    <>
      <MemoizedListaGrande items={newItems}></MemoizedListaGrande>
      <button onClick={handleClick}>Actualizar lista</button>
    </>
  );
};
