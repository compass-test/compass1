/**
 * Retrieves PR metadata for branches merged into a specific release
 * Useful for obtaining a list of jira tickets or bitbucket PRs that are included in a release.
 *
 * Usage: yarn -s get-prs <release-name> [--force] [--develop]
 *
 * where release-name is the name of your release, provided it has a release-candidate branch already created.
 *
 * Environment Variables:
 *
 *  - BITBUCKET_USERNAME (required): Bitbucket username to auth against bitbucket's REST API
 *  - BITBUCKET_PASSWORD (required): Bitbucket app password to auth against bitbucket's REST API. This should be an app password generated from your profile page and *not* your own bitbucket password
 *
 * Options:
 *  --develop Can be used if an RC branch does not exist yet, in which case it will include all PRs merged into origin/develop
 *  --force   Used to refetch PR information from bitbucket. PR information is cached otherwise.
 *
 * Can be piped into jq to easily obtain a list of jira tickets that can be pasted into confluence and automatically converted into smart links:
 *
 * $ brew install jq
 * $ cd build/release/scheduled-releases
 * $ BITBUCKET_USERNAME=abc BITBUCKET_PASSWORD=def yarn -s get-prs plush > plush.json
 * $ jq '.[].jiraUrl' -r plush.json | uniq
 */
import fse from 'fs-extra';
import fetch, { Response } from 'node-fetch';
import meow from 'meow';
import simpleGit, { LogOptions } from 'simple-git/promise';
import pLimit from 'p-limit';
import { DefaultLogFields, ListLogLine } from 'simple-git/typings/response';
import { PullRequest } from '@atlaskit/build-utils/bitbucket/types';
import { TeamsJson } from '@atlaskit/build-utils/types';

const cacheFile = '.release-prs';
const git = simpleGit('./');
// Suppress git output as we are using some checks that will print to stderr
git.silent(true);

const limit = pLimit(25);

type GitLogEntry = DefaultLogFields & ListLogLine;

export type Auth = {
  username: string;
  password: string;
};

type FetchedPR = {
  log: GitLogEntry;
  pr: PullRequest;
};

function validateAuth(auth: {
  username?: string;
  password?: string;
}): auth is Auth {
  return auth && auth.username != null && auth.password != null;
}

function requestPR(prId: string, auth: Auth) {
  const token = Buffer.from(`${auth.username}:${auth.password}`).toString(
    'base64',
  );
  const options = {
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  };

  return limit(() =>
    fetch(
      `https://api.bitbucket.org/2.0/repositories/atlassian/atlassian-frontend/pullrequests/${prId}`,
      options,
    ),
  );
}

async function fetchPRs(
  logEntries: ReadonlyArray<GitLogEntry>,
  auth: Auth,
): Promise<{ fetches: FetchedPR[]; errors: Response[] }> {
  const errors: Response[] = [];
  const fetches = await Promise.all(
    logEntries.map(async e => {
      const match = e.message.match(/pull request #(\d+) merged/);
      if (match == null) {
        return null;
      }
      const prId = match[1];
      const res = await requestPR(prId, auth);
      if (res.ok) {
        const json: PullRequest = await res.json();
        return { log: e, pr: json };
      }
      errors.push(res);
    }),
  );

  return { fetches: fetches.filter((f): f is FetchedPR => f != null), errors };
}

function getJiraProjectMapping(teams: TeamsJson) {
  return Object.entries(teams).reduce((acc, [name, cur]) => {
    if (!cur.project) {
      console.error(`Missing project in ${cur}`);
      return acc;
    }
    // TODO: Jira server has a different path
    const match = cur.project.match(/\/browse\/([^/]+)$/);
    if (!match) {
      console.error(
        `Missing projectId in ${name}. Must be of the form /browse/<PROJECT_KEY>`,
      );
      return acc;
    }
    const projectId = match[1];
    if (acc[projectId]) {
      console.error(
        `Ambiguous projectId ${projectId} matches ${cur.project} and ${acc[projectId]}`,
      );
      return acc;
    }
    acc[projectId] = cur.project;

    return acc;
  }, {} as { [project: string]: string });
}

function getJiraUrl(
  jiraTicket: string | null,
  urlMapping: { [project: string]: string },
) {
  if (!jiraTicket) {
    return null;
  }
  const match = jiraTicket.match(/(.+)-(.+)/);
  if (!match) {
    console.warn(`Could not find jira project from ${jiraTicket}`);
    return null;
  }
  const projectUrl = urlMapping[match[1]];
  if (!projectUrl) {
    console.warn(`Could not find jira project for ${jiraTicket}`);
    return null;
  }

  return `${projectUrl}-${match[2]}`;
}

function formatResults(fetches: FetchedPR[], teams: TeamsJson) {
  const jiraUrlMapping = getJiraProjectMapping(teams);
  const pullRequests = fetches
    .filter(v => !!v)
    .map(({ log, pr }) => {
      const ticketMatch = pr.title.match(/([A-Z]{2,}-\d{1,})/);
      const jiraTicket = ticketMatch && ticketMatch[1];
      const jiraUrl = getJiraUrl(jiraTicket, jiraUrlMapping);
      const prLink = `https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/${pr.id}`;

      return {
        pullRequestId: pr.id,
        jiraTicket: ticketMatch && ticketMatch[1],
        branch: pr.source.branch.name,
        author: pr.author.display_name,
        authorEmail: log.author_email,
        link: prLink,
        title: pr.title,
        mergeDate: log.date,
        mergeCommit: pr.merge_commit ? pr.merge_commit.hash : '',
        jiraUrl: jiraUrl || prLink,
      };
    })
    .sort((a, b) => {
      // Sort tickets alphabetically so that they are grouped together by project key and can be easily categorised
      const aTicket = a.jiraTicket;
      const bTicket = b.jiraTicket;
      if (aTicket != null) {
        return bTicket != null ? aTicket.localeCompare(bTicket) : -1;
      } else if (bTicket != null) {
        return 1;
      }

      return a.pullRequestId - b.pullRequestId;
    });

  const authors = pullRequests.reduce((acc, pullRequest) => {
    if (!acc[pullRequest.authorEmail]) {
      acc[pullRequest.authorEmail] = [];
    }
    const currentAuthor = acc[pullRequest.authorEmail];
    currentAuthor.push({
      authorEmail: pullRequest.authorEmail,
      ticket: pullRequest.jiraTicket,
      ticketUrl: pullRequest.jiraUrl,
      link: pullRequest.link,
      title: pullRequest.title,
    });
    return acc;
  }, {} as AuthorMetadata);

  const teamNames = Object.keys(teams);
  const teamsInfo: Record<string, PullRequestTeamMetadata> = {};
  teamNames.forEach(teamName => {
    const team = teams[teamName];
    const contributors = team.contributors;
    let pullRequestsFromContributors: Record<string, AuthorMetadataItem[]> = {};
    contributors.forEach(contributor => {
      const contributorUsername = `${contributor}@atlassian.com`;
      const pullRequestsFromContributor = authors[contributorUsername] || [];
      pullRequestsFromContributors[
        contributorUsername
      ] = pullRequestsFromContributor;
    });
    teamsInfo[teamName] = {
      pullRequests: pullRequestsFromContributors,
      channel: team.slack,
    };
  });

  return { pullRequests, authors, teams: teamsInfo };
}

async function getTargetBranch(
  releaseName: string,
  useDevelop: boolean | undefined,
  logger: (msg: string) => void,
  dev?: boolean,
  proxyReleaseEndTag?: string,
) {
  const remote = dev ? 'fork' : 'origin';
  if (useDevelop) {
    return `${remote}/develop`;
  }
  const releaseCandidate = `${remote}/release-candidate/${releaseName}`;
  // The reason of '^2' is because 'release/{releaseName}' tag is done on master
  // and for the log to work we need a commit on the develop, otherwise, we are
  // going to retrieve PRs from master too.
  const releaseTag = `release/${releaseName}^2`;

  try {
    await git.raw(['rev-parse', releaseCandidate]);
    logger(`Found rc branch: ${releaseCandidate}`);
    return releaseCandidate;
  } catch (e) {
    // Error means rc does not exist
  }

  try {
    await git.raw(['rev-parse', releaseTag]);
    logger(`Found released version: ${releaseTag}`);
    return releaseTag;
  } catch (e) {
    // Error means release tag does not exist
  }

  if (proxyReleaseEndTag) {
    try {
      await git.raw(['rev-parse', proxyReleaseEndTag]);
      logger(`Found proxy end-release tag: ${proxyReleaseEndTag}`);
      return proxyReleaseEndTag;
    } catch (e) {
      // Error means proxy end-release tag does not exist
    }
  }

  throw Error(
    `Cannot find an RC branch or an already released tag for ${releaseName}. Use --develop if the release has not been cut`,
  );
}

export type Options = {
  forceFetch?: boolean;
  useDevelop?: boolean;
  logger?: (message: string) => void;
  dev?: boolean;
  proxyReleaseEndTag?: string;
  since?: string;
};

const defaultLogger = () => undefined;

export type GetPrsResponse = {
  pullRequests: PrMetadata[];
  teams: Record<string, PullRequestTeamMetadata>;
  authors: AuthorMetadata;
};

export type PullRequestTeamMetadata = {
  pullRequests: AuthorMetadata;
  channel: string;
};

export type TeamMetadata = Record<string, PullRequestTeamMetadata>;

export type AuthorMetadataItem = {
  authorEmail: string;
  ticket: string | null;
  ticketUrl: string;
  link: string;
  title: string;
};
export type AuthorMetadata = Record<string, Array<AuthorMetadataItem>>;

export type PrMetadata = {
  branch: string;
  pullRequestId: number;
  jiraTicket: string | null;
  author: string;
  link: string;
  title: string;
  mergeDate: string;
  mergeCommit: string;
  jiraUrl: string;
};

export default async function main(
  releaseName: string,
  auth: Auth,
  options: Options,
): Promise<GetPrsResponse> {
  if (!releaseName) {
    console.error('Usage: get-prs <release-name> [--force] [--develop]');
    throw Error('Missing release name');
  }

  const log = options.logger || defaultLogger;
  await git.fetch();
  const targetBranch = await getTargetBranch(
    releaseName,
    options.useDevelop,
    log,
    options.dev,
    options.proxyReleaseEndTag,
  );

  const logOptions: LogOptions = {
    from: `next-release-start-${releaseName}`,
    to: targetBranch,
    '--first-parent': true,
  };
  if (options.since) {
    logOptions['--since'] = options.since;
  }
  const { all } = await git.log(logOptions);

  let fetches;
  let cache: Record<string, FetchedPR[]>;
  try {
    cache = await fse.readJSON(cacheFile);
    if (cache[releaseName] && cache[releaseName].length > 0) {
      fetches = cache[releaseName];
    }
    const invalidCacheKey = Object.keys(cache).find(key => !/^\w+$/.test(key));
    if (invalidCacheKey) {
      log('Detected invalid cache, clearing');
      // Clear cache if it's not the right structure (e.g. an array)
      cache = {};
    }
  } catch (e) {
    cache = {};
  }

  if (!fetches || options.forceFetch) {
    const result = await fetchPRs(all, auth);
    fetches = result.fetches;

    if (result.errors.length > 0) {
      console.error('Found the following errors', result.errors);
    }
    if (fetches.filter(Boolean).length > 0) {
      log(`Caching fetched PRs in ${cacheFile}`);
      await fse.writeJSON(cacheFile, { ...cache, [releaseName]: fetches });
    }
  } else {
    log(
      `Using cached PRs from ${cacheFile}, use --force to refetch them for ${releaseName}`,
    );
  }

  const teams = await fse.readJSON(`${__dirname}/../../../../teams.json`);
  return formatResults(fetches, teams);
}

if (require.main === module) {
  const cli = meow(
    `
    Retrieves PR metadata for branches merged into a specific release
    Useful for obtaining a list of jira tickets or bitbucket PRs that are included in a release.

    Usage: yarn -s get-prs <release-name> [--force] [--develop]
    where release-name is the name of your release, provided it has a release-candidate branch already created.

    Environment Variables:
     - BITBUCKET_USERNAME (required): Bitbucket username to auth against bitbucket's REST API
     - BITBUCKET_PASSWORD (required): Bitbucket app password to auth against bitbucket's REST API. This should be an app password generated from your profile page and *not* your own bitbucket password

    Options:
     --develop Can be used if an RC branch does not exist yet, in which case it will include all PRs merged into origin/develop
     --force   Used to refetch PR information from bitbucket. PR information is cached otherwise.
`,
    {
      description:
        'Retrieves PR metadata for branches merged into a specific release',
      flags: {
        force: {
          type: 'boolean',
        },
        develop: {
          type: 'boolean',
        },
      },
    },
  );

  const options = {
    forceFetch: cli.flags.force,
    useDevelop: cli.flags.develop,
    // Use console.warn so that logs are printed to stderr and don't pollute stdout which contains the JSON
    logger: console.warn,
  };
  const auth = {
    username: process.env.BITBUCKET_USERNAME,
    password: process.env.BITBUCKET_PASSWORD,
  };
  if (!validateAuth(auth)) {
    console.error(
      'Missing $BITBUCKET_USERNAME or $BITBUCKET_PASSWORD environment variables',
    );
    process.exit(1);
  }
  main(cli.input[0], auth as Auth, options)
    .then(results => {
      console.log(JSON.stringify(results, null, 2));
    })
    .catch((e: Error) => {
      console.error(e);
      process.exit(1);
    });
}
