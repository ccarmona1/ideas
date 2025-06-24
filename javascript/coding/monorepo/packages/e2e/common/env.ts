const FRONTEND_URL =
  process.env.DEPLOY_ENV === 'dev'
    ? 'http://localhost:5173'
    : 'https://tester-99ds.onrender.com';

export { FRONTEND_URL };
