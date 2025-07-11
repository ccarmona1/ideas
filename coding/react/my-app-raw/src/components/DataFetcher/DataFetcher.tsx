import { useEffect, useState, type FC, type ReactNode } from 'react';

interface DataFetcherProps {
  url: string;
  children: (data: string[]) => ReactNode;
}

export const DataFetcher: FC<DataFetcherProps> = ({ url, children }) => {
  const [newData, setNewData] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      console.log(`Fetching data from ${url}`);
      // Simulate a data fetch
      setNewData(['data1', 'data2', 'data3']);
    }, 10000);
  }, [url]);

  return children(newData);
};
