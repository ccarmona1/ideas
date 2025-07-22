import { Card } from './Card';
import { Error } from './Error';
import { Loading } from './Loading';

export const LoaderCard = ({ loading, error, data, children }) => {
  return (
    <Card key={data || loading || error}>
      {loading ? (
        <Loading aria-live="loading">Loading</Loading>
      ) : error ? (
        <Error aria-live="error">
          {error?.message ?? 'Oops! Please refresh the page or try again later'}
        </Error>
      ) : (
        children
      )}
    </Card>
  );
};
