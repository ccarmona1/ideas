import { memo, useState, type FC } from 'react';
import { MyFunctional } from './MyFunctional';
import { MyClass } from './MyClass';

// Memoized version of MyFunctional to prevent unnecessary re-renders (similar to shouldComponentUpdate in class components)
const MemoizedFunctional = memo(MyFunctional, (prevProps, nextProps) => {
  console.log('MemoizedFunctional render');
  return prevProps.externalState === nextProps.externalState;
});

export const ClassVsFunctional: FC = () => {
  const [state, setState] = useState(2);
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <>
          <MemoizedFunctional externalState={state}></MemoizedFunctional>
          <MyClass externalState={state}></MyClass>
          <button onClick={() => setState(state + 10)}>Send</button>
        </>
      )}
      <button onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Show'} components
      </button>
    </>
  );
};
