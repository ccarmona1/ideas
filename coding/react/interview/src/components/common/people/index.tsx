import { type FC } from 'react';
import useFetch from '../../../hooks/useFetch';
import type { People } from '../../../interfaces/people';

interface PeopleListProps {
  url: string;
}

export const PeopleList: FC<PeopleListProps> = ({ url }) => {
  console.count('PeopleList render');
  const [data, loading, error] = useFetch<People>(url);

  if (loading) {
    return <>Loading people...</>; // we could move this to another component
  }

  if (!data || !data.results) {
    return <>No data</>; // Also me could move this to another component
  }

  const people = data.results;

  if (error) {
    return <>Error Message: {error}</>; // move to another component
  }

  return (
    <>
      <h2>People:</h2>
      {people.map((people) => {
        return <div key={people.uid}>{people.name}</div>;
      })}
    </>
  );
};
