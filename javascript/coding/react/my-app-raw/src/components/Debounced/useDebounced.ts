import { useEffect } from 'react';

export const useDebounced = (
  value: string,
  setDebouncedValue: (value: string) => void
) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, setDebouncedValue]);
};
