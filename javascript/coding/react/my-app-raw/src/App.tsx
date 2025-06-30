import { useCallback } from 'react';
import './App.css';
import { Debounced } from './components/Debounced/Debounced';

function App() {
  const print = useCallback((value: string) => {
    console.log(value);
  }, []);

  return (
    <>
      <Debounced
        value="initial value"
        handleNewDebouncedValue={print}
      ></Debounced>
    </>
  );
}

export default App;
