import { memo, useState } from 'react';
import { Card } from '../../common/Card';

export const GitHubSearch = memo(({ setUsernameInput }) => {
  console.count('GitHubSearch');
  const [value, setValue] = useState(); // we could use a debounced value here to prevent multiple changes in short times

  const handleOnClick = (e) => {
    e.preventDefault();
    setUsernameInput(value);
  };

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          justifyItems: 'center',
          height: '100%',
          gap: '1rem',
        }}
      >
        <label htmlFor="username">Username:</label>
        <input
          style={{ height: 'unset' }}
          id="username"
          aria-label="Username Input"
          autoComplete="username"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type the username"
        ></input>

        <button onClick={handleOnClick} aria-label="Search by username button">
          Search
        </button>
      </div>
    </Card>
  );
});
