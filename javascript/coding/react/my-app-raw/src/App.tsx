import { useState } from 'react';
import './App.css'
import TimerClass from './components/ClassComponent'
import FunctionalComponent from './components/FunctionalComponent'
import Padre from './components/MemoCallback'
import Hermanos from './components/Hermanos';
import Context from './components/ApiContext';

function App() {

  const [count, setCount] = useState(0);

  return (
    <>
      <FunctionalComponent initialSeconds={10}></FunctionalComponent>
      <TimerClass></TimerClass>
      <Padre initialCount={count}></Padre>
      <button onClick={() => setCount(c => c + 1)}></button>
      <Hermanos></Hermanos>
      <Context></Context>
    </>
  )
}

export default App
