import { useState } from 'react';
import { GitHubSearch } from './components/github/search/GithubSearch';
import { GitHubUser } from './components/github/user/GitHubUser';
import { useFetchGitHubUser } from './hooks/useFetchGitHubUser';
import { Container } from './components/common/Container';

function App() {
  const [usernameInput, setUsernameInput] = useState();

  const { user, loading, error } = useFetchGitHubUser({
    username: usernameInput,
  });

  return (
    <Container>
      <GitHubSearch setUsernameInput={setUsernameInput} />
      <GitHubUser user={user} loading={loading} error={error} />
    </Container>
  );
}

export default App;
