import https from 'https';
import { PaginatedPullRequests, PullRequest } from './types';

// We use the node https library so that we can run this script without installing any dependencies
// even though we have to add some extra wrapping functions
function httpGetRequest(
  url: string,
  authOverride?: { username: string; password: string },
) {
  const { BITBUCKET_USER, BITBUCKET_PASSWORD } = process.env;

  const username = authOverride ? authOverride.username : BITBUCKET_USER;
  const password = authOverride ? authOverride.password : BITBUCKET_PASSWORD;

  if (!username || !password) {
    throw Error(
      'Missing bitbucket username/password. Either no auth override or $BITBUCKET_USER or $BITBUCKET_PASSWORD environment variables are not set',
    );
  }
  const auth = Buffer.from(`${username}:${password}`).toString('base64');
  const options = {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  };
  return new Promise((resolve, reject) => {
    let data = '';

    const req = https.get(url, options, resp => {
      resp.on('data', chunk => (data += chunk));
      resp.on('end', () => resolve(JSON.parse(data)));
    });

    req.on('error', err => reject(err));
  });
}

/**
 * Retrieves an open PR containing `commitHash` as the top source commit, or `undefined` if none exist.
 * Will throw if more than one PR is found. Commit hash requires 12 chars minimum.
 */
export async function getPrFromCommit(
  commitHash: string,
  repoFullName: string,
  query?: string | undefined,
  authOverride?: { username: string; password: string },
) {
  if (!commitHash || !repoFullName) {
    throw Error('Missing commitHash or repoFullName');
  }

  const additionalQuery = query ? ` AND ${query}` : '';
  const filterQuery = encodeURIComponent(`state = "OPEN"${additionalQuery}`);

  // We sort descending on created_on to get newest first and only look at open PRs
  let endpoint:
    | string
    | undefined = `https://api.bitbucket.org/2.0/repositories/${repoFullName}/pullrequests?sort=-created_on&pagelen=20&q=${filterQuery}`;
  let response: PaginatedPullRequests;
  let matchedPr: PullRequest | undefined;

  do {
    // TODO: TS 3.7 assertion
    if (!endpoint) {
      throw Error('Missing endpoint');
    }
    response = (await httpGetRequest(
      endpoint,
      authOverride,
    )) as PaginatedPullRequests;
    if (!response || !response.values) {
      throw Error(
        `Response is not in the format we expected. Received:\n${JSON.stringify(
          response,
        )}`,
      );
    }
    const openPRs = response.values.filter(
      pr =>
        pr.source &&
        pr.source.commit &&
        pr.source.commit.hash &&
        commitHash.startsWith(pr.source.commit.hash),
    );
    if (openPRs.length === 1) {
      matchedPr = openPRs[0];
    } else if (openPRs.length > 1) {
      throw Error(
        `Found multiple open PRs for commit ${commitHash}. PR ids: ${openPRs.map(
          pr => pr.id,
        )}`,
      );
    }
    endpoint = response.next;
  } while (!matchedPr && response.next);

  return matchedPr;
}
