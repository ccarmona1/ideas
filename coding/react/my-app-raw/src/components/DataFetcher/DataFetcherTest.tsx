import type { FC } from 'react';
import { DataFetcher } from './DataFetcher';

export const DataFetcherTest: FC = () => {
  return (
    <DataFetcher url={''}>
      {(data) => (
        <div>
          {data.length
            ? 'Done! ' + JSON.stringify(data)
            : 'Getting data from dataFecher'}
        </div>
      )}
    </DataFetcher>
  );
};
