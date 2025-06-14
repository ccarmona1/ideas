import { useState } from 'react';
import './App.css'
import TimerClass from './components/ClassComponent'
import FunctionalComponent from './components/FunctionalComponent'
import Padre from './components/MemoCallback'

function App() {

  const [count, setCount] = useState(0);

  return (
    <>
      <FunctionalComponent initialSeconds={10}></FunctionalComponent>
      <TimerClass></TimerClass>
      <Padre initialCount={count}></Padre>
      <button onClick={() => setCount(c => c + 1)}></button>
    </>
  )
}

export default App
