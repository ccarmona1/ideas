// React 16.x code​​​​​​‌‌​‌‌​‌‌‌​‌​‌‌​‌‌​‌​‌‌‌‌​ below
import React, { useState, useEffect } from 'react';

// Your job is to implement the LocalStorageProvider component.
export function LocalStorageProvider({ children }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const retrieveData = () => {
      const data = localStorage.getItem('appData');
      setData(JSON.parse(data));
    };

    retrieveData();
  }, []);

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { data })
      )}
    </>
  );
}

// Sample child component for testing
export function ChildComponent({ data }) {
  return (
    <div className="answer" role="region" aria-label="answer">
      {data ? (
        <p>Data Loaded: {JSON.stringify(data)}</p>
      ) : (
        <p>No data found in localStorage.</p>
      )}
    </div>
  );
}

// Default App component for testing
export function App() {
  return (
    <LocalStorageProvider>
      <ChildComponent />
    </LocalStorageProvider>
  );
}

/* Ignore and do not change the code below */
export function Preview() {
  return <App />;
}
/* Ignore and do not change the code above */

// Export main App component
export default App;
