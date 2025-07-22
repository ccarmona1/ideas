import { LoaderCard } from '../../common/LoaderCard';

export const GitHubUser = ({ user, loading, error }) => {
  console.count('GitHubUser');
  return (
    <LoaderCard data={user} loading={loading} error={error}>
      {!user ? (
        <>Please select an user</>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <img
              style={{
                width: 180,
                height: 180,
                objectFit: 'cover',
                borderRadius: '50%',
              }}
              aria-label="avatar url"
              src={user.avatar_url}
            ></img>
          </div>
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <span aria-label="username">username:</span>{' '}
              <span>{user.login}</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <span aria-label="user id">id:</span> <span>{user.id}</span>
            </div>
          </div>
        </div>
      )}
    </LoaderCard>
  );
};
