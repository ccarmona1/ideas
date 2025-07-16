const SearchBar = ({ handleOnChange }) => {
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        aria-label="search"
        onChange={handleOnChange}
        placeholder="Type to search"
        role="input"
      ></input>
    </div>
  );
};

export default SearchBar;
