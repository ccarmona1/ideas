import { useState } from "react";

function HermanoA({ setValor }: { setValor: (v: string) => void }) {
  return <button  onClick={() => setValor("Mensaje de A")}>Enviar a B</button>;
}
function HermanoB({ valor }: { valor: string }) {
  return <div>Recibido: {valor}</div>;
}
function Hermanos() {
  const [valor, setValor] = useState("");
  return (
    <>
      <HermanoA setValor={setValor} />
      <HermanoB valor={valor} />
    </>
  );
}

export default Hermanos;