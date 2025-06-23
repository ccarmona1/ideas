import { Octokit } from '@octokit/rest';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN must be set in environment variables');
}

const internalOctokit: Octokit = new Octokit({ auth: GITHUB_TOKEN });

const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
if (!GITHUB_OWNER || !GITHUB_REPO) {
  throw new Error(
    'GITHUB_OWNER and GITHUB_REPO must be set in environment variables'
  );
}

export const getContent = async (path: string) => {
  const response = await internalOctokit.repos.getContent({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    path: path as string,
  });

  return response.data;
};

export default internalOctokit;
