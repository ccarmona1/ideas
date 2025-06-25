import { useEffect, useState } from 'react';

interface UseApiResourceResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

type Fetcher<T> = (signal: AbortSignal) => Promise<T>;

export function useApiResource<T>(
  fetcher: Fetcher<T>,
  deps: object[] = [],
): UseApiResourceResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetcher(controller.signal)
      .then((result) => {
        setData(result);
        setError(null);
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setData(null);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, deps);

  return { data, loading, error };
}
