import { useState } from 'react';
import { useFetchEmployees } from '../../hooks/useFetchEmployees';
import ListEmployees from './listEmployees';
import SearchBar from './searchBar';

const SearchEmployees = ({ handleSelectEmployee }) => {
  console.count('ListEmployees');
  const [filterInput, setFilterInput] = useState();
  const [employees, loading] = useFetchEmployees(filterInput);

  const handleOnChange = (e) => {
    setFilterInput(e.target.value ?? '');
  };

  return (
    <>
      <section>
        <SearchBar handleOnChange={handleOnChange}></SearchBar>
      </section>

      {loading && <>Loading data...</>}

      {employees?.length > 0 && (
        <section>
          <ListEmployees
            handleSelectEmployee={handleSelectEmployee}
            employees={employees}
          ></ListEmployees>
        </section>
      )}
    </>
  );
};

export default SearchEmployees;
