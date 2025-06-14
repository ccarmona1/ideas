import { useState } from 'react';
import styles from './Hermanos.module.css';

function HermanoA({ setValor }: { setValor: (v: string) => void }) {
  return <button onClick={() => setValor('Mensaje de A')}>Enviar a B</button>;
}
function HermanoB({ valor }: { valor: string }) {
  return <div>Recibido: {valor}</div>;
}
function Hermanos() {
  const [valor, setValor] = useState('');

  

  return (
    <div className={styles.hermanos}>
      <HermanoA setValor={setValor} />
      <HermanoB valor={valor} />
    </div>
  );
}

export default Hermanos;
