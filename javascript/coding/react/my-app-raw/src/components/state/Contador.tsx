import { useState } from 'react';

type ContadorProps = {
  initialCount?: number;
};

const Contador: React.FC<ContadorProps> = ({ initialCount }) => {
  const [count, setCount] = useState<number>(initialCount ?? 0);

  return (
    <div>
      <p>Cuenta: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
};

export default Contador;
