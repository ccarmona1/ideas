import { useEffect, useState } from 'react';
import type { Response } from '../../interfaces/common';

const useFetch = <T>(
  url: string,
  init?: RequestInit
): [Response<T> | undefined, boolean, string | undefined] => {
  const [state, setState] = useState<
    | {
        loading: boolean;
        error?: string;
        data?: Response<T>;
      }
    | undefined
  >();
  useEffect(() => {
    const fetchData = async () => {
      setState({ loading: true });
      try {
        const response = await fetch(url, init);
        const data: Response<T> = await response.json();

        if (data.message !== 'ok') {
          setState({ loading: false, error: 'Oops!' }); // make reusable messages
        } else {
          setState({ loading: false, data });
        }
      } catch (error) {
        setState({ loading: false, error: 'Oops! ' + error }); // make reusable messages
      }
    };
    fetchData();
  }, [url, init]);

  return [state?.data, state?.loading || false, state?.error];
};

export default useFetch;
