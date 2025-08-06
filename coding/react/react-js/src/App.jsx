import './App.css';
import { CountClass } from './components/CountClass';
import { CountFunctional } from './components/CountFunctional';

function App() {
  return (
    <>
      <div>
        <CountClass initValue={1500}></CountClass>
      </div>
      <div>
        <CountFunctional initValue={2500}></CountFunctional>
      </div>
    </>
  );
}

export default App;
