import React, { useContext } from "react";

const TemaContext = React.createContext("claro");

function Hijo() {
  const tema = useContext(TemaContext);
  return <div>Tema actual: {tema}</div>;
}

function Context() {
  return (
    <TemaContext.Provider value="oscuro">
      <Hijo />
    </TemaContext.Provider>
  );
}

export default Context
