import { memo, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Error } from '../common/error';
import { Loading } from '../common/loading';
import { PeopleList } from '../people/list';
import { Person } from '../people/description';
import './index.css';

const MemoPeopleList = memo(PeopleList);

export const Dashboard = () => {
  console.count('Dashboard count');

  const [selectedPerson, setSelectedPerson] = useState();

  const [data, loading, error] = useFetch({
    url: 'https://www.swapi.tech/api',
  });

  const urls = data?.result;

  return (
    <section className="dashboard-container">
      <h1 style={{ textAlign: 'center' }}>Dashboard</h1>

      <div>
        {loading ? (
          <Loading name={'Dashboard'}></Loading>
        ) : error ? (
          <Error></Error>
        ) : urls ? (
          <div className="dashboard-flex-row">
            <MemoPeopleList
              url={urls.people}
              handleSelectItem={setSelectedPerson}
            ></MemoPeopleList>
            {selectedPerson && (
              <Person personMetadata={selectedPerson}></Person>
            )}
          </div>
        ) : (
          <>No Data</>
        )}
      </div>
    </section>
  );
};
