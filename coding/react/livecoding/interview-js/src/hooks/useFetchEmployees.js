import { useEffect, useState } from 'react';

const mockData = [
  { name: 'Crisman', id: 1, details: 'worker' },
  { name: 'Alejandro', id: 2, details: 'student' },
  { name: 'Matt', id: 3, details: 'worker' },
  { name: 'Monica', id: 4, details: 'worker' },
  { name: 'Azucena', id: 5, details: 'student' },
  { name: 'Sky', id: 6, details: 'student' },
];

export const useFetchEmployees = (filterInput) => {
  const [employees, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);

      if (filterInput) {
        setData(mockData.filter((e) => e.name.includes(...filterInput)));
      } else {
        setData(mockData);
      }
    }, 50);
    return () => {
      clearInterval(timeout);
    };
  }, [filterInput]);

  return [employees, loading];
};
