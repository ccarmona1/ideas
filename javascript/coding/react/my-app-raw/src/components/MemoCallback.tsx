import React, { useCallback, useState } from "react";

const Hijo = React.memo(({ onAccion }: { onAccion: () => void }) => {
  console.log("Hijo renderizado");
  return <button onClick={onAccion}>Acción</button>;
});

const Padre: React.FC<{initialCount: number}> = ({initialCount: initialCount}) => {
  const [contador, setContador] = useState(initialCount);

  // Sin useCallback: nueva función en cada render
  // const handleAccion = () => { ... };

  // Con useCallback: misma referencia mientras no cambien dependencias
  const handleAccion = useCallback(() => {
    console.log("Acción realizada");
    setContador(c => c + 1);
  }, []);

  return (
    <div>
      <Hijo onAccion={handleAccion} />
      <button onClick={() => setContador(c => c + 1)}>Incrementar</button>
      <>{contador}</>
    </div>
  );
}

export default Padre;