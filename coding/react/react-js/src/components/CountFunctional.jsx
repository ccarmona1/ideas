import { memo, useEffect, useRef, useState } from 'react';
export const CountFunctional = memo(
  function CountFunctional({ initValue }) {
    const [currentValue, setCurrentValue] = useState(0);
    const renderCount = useRef(0);

    renderCount.current++;
    console.log('Functional render count:', renderCount.current);

    const handleButton = () => {
      setCurrentValue(currentValue + 2);
    };

    // We must run side effects or DOM modifications in useEffects

    useEffect(() => {
      // Simulates getDerivedStateFromProps or componentDidMount: updates the state based on props
      setCurrentValue((initValue ?? 0) + 2);
      return () => {
        console.log('Unmounting functional'); // Simulates componentWillUnmount
        setCurrentValue(0);
      };
    }, [initValue]);

    useEffect(() => {
      // Simulates componentDidUpdate with sideEffects
      setTimeout(() => {
        console.log('currentValue functional - timeout:', currentValue);
      }, 1000);
    }, [currentValue]);

    return (
      <>
        <span> Init Value Functional: {currentValue}</span>
        <button onClick={handleButton}>Increment Functional</button>
      </>
    );
  },
  (prev, next) => prev.initValue === next.initValue // Prevent unneeded renders, simulates shouldComponentUpdate
);
