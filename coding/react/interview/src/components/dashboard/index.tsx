import type { FC } from 'react';
import useFetch from '../../hooks/useFetch';
import { FilmList } from '../common/films';
import { PeopleList } from '../common/people';

export const Dashboard: FC = () => {
  console.count('Dashboard render');

  const [data, loading, error] = useFetch<DashboardData>(
    'https://www.swapi.tech/api/'
  ); // we can use an environment variable

  if (loading) {
    return <>Loading data...</>;
  }

  if (!data || !data.result) {
    return <>Star Wars is offline now</>;
  }

  const { result: dashboard } = data;

  if (error) {
    return <>Error message: {error}</>;
  }

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to the Star Wars dashboard!</p>
      </div>
      <div>
        <FilmList url={dashboard.films}></FilmList>
      </div>
      <div>
        <PeopleList url={dashboard.people}></PeopleList>
      </div>
      <div>
        <h2>Planets</h2>
        Planets...
      </div>
      <div>
        <h2>Species</h2>
        Species...
      </div>
      <div>
        <h2>StarsShips</h2>
        StarsShips...
      </div>
      <div>
        <h2>Vehicles</h2>
        Vehicles...
      </div>
    </>
  );
};

export default Dashboard;
