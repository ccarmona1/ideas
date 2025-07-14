import { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { Error } from '../../common/error';
import { Loading } from '../../common/loading';

export const PeopleList = ({ url, handleSelectItem }) => {
  console.count('People List');
  const [paginationState, setPaginationState] = useState({ page: 1 });
  const [data, loading, error] = useFetch({ url, page: paginationState.page });

  const peopleResult = data?.results;

  return (
    <section style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>People - Current page {paginationState.page}</h2>
      <div>
        {loading ? (
          <Loading name={'People List'}></Loading>
        ) : error ? (
          <Error></Error>
        ) : peopleResult?.length > 0 ? (
          <>
            <div>
              {peopleResult.map((person) => (
                <div key={person.uid} style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>{person.name}</div>
                  <button
                    onClick={() => {
                      handleSelectItem(person);
                    }}
                  >
                    Open
                  </button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                disabled={paginationState.page === 1}
                onClick={() =>
                  setPaginationState((prev) => {
                    return { ...prev, page: prev.page - 1 };
                  })
                }
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setPaginationState((prev) => {
                    return { ...prev, page: prev.page + 1 };
                  })
                }
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <>No people</>
        )}
      </div>
    </section>
  );
};
