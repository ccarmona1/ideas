import { useFetch } from '../../hooks/useFetch';
import { Error } from '../common/error';
import { Loading } from '../common/loading';

export const HomeWorld = ({ url }) => {
  console.count('Homeworld');
  const [data, loading, error] = useFetch({ url });

  const homeWorldMetadata = data?.result;

  return loading ? (
    <Loading name={'HomeWorld'}></Loading>
  ) : error ? (
    <Error></Error>
  ) : (
    homeWorldMetadata && (
      <>
        <table>
          <tbody>
            {Object.entries(homeWorldMetadata?.properties).map(
              ([key, value]) => {
                return (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </>
    )
  );
};
