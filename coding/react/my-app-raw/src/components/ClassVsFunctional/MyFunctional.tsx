import { useEffect, useState, type FC } from 'react';

export const MyFunctional: FC<{ externalState: number }> = ({
  externalState,
}) => {
  const [state, setState] = useState(0);

  // each render
  // useEffect(() => {
  //   setState(state + 1);
  // });

  useEffect(() => {
    setState(state + 2);
    return () => {
      console.log('Component function unmounted');
      setState(0); // Cleanup logic if needed
    };
  }, []); // only once, like componentDidMount

  useEffect(() => {
    if (externalState) {
      setState(externalState);
    }
  }, [externalState]); // only when externalState changes

  return (
    <div>
      My Functional Component {JSON.stringify(state)}
      <button onClick={() => setState(state + 1)}>Update Functional</button>
    </div>
  );
};
