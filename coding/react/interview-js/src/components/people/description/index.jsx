import { useFetch } from '../../../hooks/useFetch';
import { Error } from '../../common/error';
import { Loading } from '../../common/loading';
import { HomeWorld } from '../../homeworld';

export const Person = ({ personMetadata }) => {
  console.count('Person');
  const [data, loading, error] = useFetch({ url: personMetadata.url });

  const personDetails = data?.result;
  const filteredDetails = personDetails?.properties
    ? Object.entries(personDetails?.properties).filter(
        ([key]) => key !== 'homeworld' && key !== 'url'
      )
    : [];

  return (
    <section>
      <h2>Selected person: {personMetadata.name}</h2>
      {loading ? (
        <Loading name={personMetadata.name}></Loading>
      ) : error ? (
        <Error></Error>
      ) : filteredDetails ? (
        <>
          <div>
            <h3>Properties</h3>
            <table>
              <tbody>
                {filteredDetails?.map(([key, value]) => {
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            {personDetails?.properties?.homeworld && (
              <>
                <h3>Homeworld</h3>
                <HomeWorld url={personDetails.properties.homeworld}></HomeWorld>
              </>
            )}
          </div>
        </>
      ) : (
        <>No Data</>
      )}
    </section>
  );
};
