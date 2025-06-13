import React from 'react';
import './App.css';
import Bienvenida from './components/basic/Bienvenida';
import Contador from './components/state/Contador';
import Clase from './components/clase/Clase';

function App() {
  return (
    <>
      <Bienvenida></Bienvenida>
      <Bienvenida></Bienvenida>
      <Contador initialCount={10}></Contador>
      <Clase></Clase>
    </>
  );
}

export default App;
