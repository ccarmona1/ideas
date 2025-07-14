import { type FC } from 'react';
import useFetch from '../../../hooks/useFetch';
import type { Film } from '../../../interfaces/film';

interface FilmListProps {
  url: string;
}

export const FilmList: FC<FilmListProps> = ({ url }) => {
  console.count('FilmList render');

  const [data, loading, error] = useFetch<Film[]>(url);

  if (loading) {
    return <>Loading films...</>; // we could move this to another component
  }

  if (!data || !data.result!) {
    return <>No data</>; // Also me could move this to another component
  }

  if (error) {
    return <>Error Message: {error}</>; // move to another component
  }

  const films = data.result;

  return (
    <>
      <h2>Films:</h2>
      {films.map((film) => {
        return <div key={film.uid}>{film.properties.title}</div>;
      })}
    </>
  );
};
