import { Octokit } from '@octokit/rest';
import { generateForm } from './generateForm.js';

async function init() {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const GITHUB_OWNER = process.env.GITHUB_OWNER;
  const GITHUB_REPO = process.env.GITHUB_REPO;
  const path = 'questions.json';

  const {
    data: { sha },
  } = await octokit.repos.getContent({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    path,
  });

  await generateForm();
}

await init();
export default init;
