import { useEffect, useState } from 'react';

/**
 * Allows to get data from an external api
 * @param {*} url
 * @returns [data, loading, error]
 */
export const useFetch = ({ url, page }) => {
  const [state, setState] = useState({ loading: false });

  useEffect(() => {
    setState({ loading: true });
    const getData = async () => {
      try {
        const urlWithParams = new URLSearchParams({
          page,
          limit: 10,
        }).toString();
        const response = await fetch(url + '?' + urlWithParams);
        const data = await response.json();

        setState({ loading: false, data });
      } catch (error) {
        setState({ loading: false, error });
      }
    };
    getData();
  }, [url, page]);

  return [state.data, state.loading, state.error];
};
