import { useEffect, useState } from 'react';

export const useFetch = ({ url }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (!url) return;

    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(undefined);
      setData(undefined);

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await fetch(url, { signal: abortController.signal });
        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return [data, loading, error];
};
