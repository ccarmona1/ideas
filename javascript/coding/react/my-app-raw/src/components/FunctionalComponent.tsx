
import React, { useEffect, useMemo, useState } from 'react';



const isNumber = (value: any): value is number => {
  return typeof value === 'number' && !isNaN(value);
}

const Timer: React.FC<{ initialSeconds?: any }> = ({ initialSeconds }) => {

  if(!isNumber(initialSeconds)) {
    return <div>Error: initialSeconds debe ser un número</div>;
  }

  const [seconds, setSeconds] = useState<number>(initialSeconds ?? 0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval); // Limpieza al desmontar
  }, []);

  const heavy = useMemo(() => {
    console.log('useMemo: El componente se ha renderizado y peso muchoooo');
    const heavyArray = Array.from({ length: 1000000 }, (_, i) => i);
    return { heavyArray};
  }, [])

  return <div>Timer Segundos: {seconds} {heavy.heavyArray.length}</div>;
};

export default Timer;
