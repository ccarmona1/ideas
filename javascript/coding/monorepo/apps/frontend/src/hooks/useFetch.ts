import { useApiResource } from './useApiResource';

export function useFetch<T>(url: string) {
  return useApiResource<T>(
    () =>
      fetch(url, { headers: { 'Content-Type': 'application/json' } }).then(
        (res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        }
      ),
    [url]
  );
}
