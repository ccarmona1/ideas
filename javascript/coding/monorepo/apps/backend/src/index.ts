import { Octokit } from '@octokit/rest';
import { generateForm } from './generateForm.js';

async function init() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN must be set in environment variables');
  }

  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  const GITHUB_OWNER = process.env.GITHUB_OWNER;
  const GITHUB_REPO = process.env.GITHUB_REPO;
  if (!GITHUB_OWNER || !GITHUB_REPO) {
    throw new Error(
      'GITHUB_OWNER and GITHUB_REPO must be set in environment variables'
    );
  }
  const path = '/javascript/examenes/automaticos';

  const response = await octokit.repos.getContent({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    path: path,
  });

  const courses = response.data;

  console.log(response);

  //await generateForm();
}

await init();
export default init;
