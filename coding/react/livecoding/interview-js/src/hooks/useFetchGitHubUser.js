import { useEffect, useState } from 'react';

export const useFetchGitHubUser = ({ username }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUser(undefined);
        setError(undefined);
        if (username) {
          setLoading(true);

          await new Promise((res) => setTimeout(res, 1000)); // to simulate the loading

          const response = await fetch(
            'https://api.github.com/users/' + username
          );
          const jsonResponse = await response.json();

          if (jsonResponse.status && Number(jsonResponse.status) > 299) {
            setError(jsonResponse);
          } else {
            setUser(jsonResponse);
          }
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return { user, loading, error };
};
