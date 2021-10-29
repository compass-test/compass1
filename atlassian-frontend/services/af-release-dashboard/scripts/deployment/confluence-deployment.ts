import { validateEnvVars as checkEnvironmentVariables } from '@atlaskit/build-utils/guards';
import fetch from 'node-fetch';

interface VersionFile1 {
  afCommitHash: string;
  afBranchName: string;
  branchIsModified: boolean;
}

interface VersionFile2 {
  akCommitHash: string;
  akBranchName: string;
  branchIsModified: boolean;
}

type BranchDeployVersionFile = VersionFile1 | VersionFile2;

interface BranchDeployMetadata {
  commitHash: string;
  branchIsModified: boolean;
}

export interface ConfluenceDeploymentInfo extends BranchDeployMetadata {
  buildRestUrl: string;
  buildBrowseUrl: string;
}

type BambooBuildState = 'Successful' | 'Failed';

interface BambooResult {
  buildNumber: number;
  buildState: BambooBuildState;
  id: number;
  key: string;
  number: number;
  state: BambooBuildState;
}

interface BambooResults {
  results: {
    expand: string;
    'max-result': number;
    size: number;
    result: BambooResult[];
  };
}

interface BambooBuildResult {
  buildCompletedDate: string;
  buildCompletedTime: string;
  buildNumber: number;
  buildResultKey: string;
  buildState: BambooBuildState;
  id: number;
  key: string;
  number: number;
  planName: string;
  projectName: string;
  state: BambooBuildState;
  vcsRevisionKey: string;
}

const STASH_REST_URL = 'https://stash.atlassian.com/rest/api/latest';
const BAMBOO_REST_URL =
  'https://confluence-cloud-bamboo.internal.atlassian.com/rest/api/latest';

/**
 * Constructs the URL pointing at a Bamboo build result.
 *
 * When a build number is provided it yields a single result,
 * otherwise it shows the latest N (25) builds for the plan.
 */
function getBuildResultUrl(
  buildNumber?: number,
  paging?: {
    pageIndex: number;
    pageSize: number;
  },
) {
  let pagingQuery = '';
  if (paging && !buildNumber) {
    const { pageIndex, pageSize } = paging;
    pagingQuery = `?max-result=${pageSize}&start-index=${pageIndex * pageSize}`;
  }

  // e.g. 'CONFMICRO-CFCPB14350-BUILDBRANCH';
  const BAMBOO_PLAN_KEY = process.env.PF_BRANCH_BUILD_BAMBOO_KEY || 'UNKNOWN';

  return `${BAMBOO_REST_URL}/result/${BAMBOO_PLAN_KEY}${
    buildNumber ? `-${buildNumber}` : ''
  }.json${pagingQuery}`;
}

/**
 * Constructs the URL pointing at the branch deploy version file.
 *
 * The version file contains the commit SHA from atlassian-frontend
 * which triggered the Product Integrator to synchronise pre-release
 * packages across into confluence-frontend.
 */
function getVersionFileUrl(fileName: string, commit: string) {
  return `${STASH_REST_URL}/projects/CONFCLOUD/repos/confluence-frontend/raw/${fileName}?at=${commit}`;
}

const getStashHeaders = () => {
  const { STASH_USER_BOT, STASH_TOKEN_BOT } = process.env;
  const auth = Buffer.from(`${STASH_USER_BOT}:${STASH_TOKEN_BOT}`).toString(
    'base64',
  );
  return {
    Authorization: `Basic ${auth}`,
  };
};

const getBambooHeaders = () => {
  return {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.CONFLUENCE_BAMBOO_TOKEN}`,
  };
};

const maxPageRequests = 3;

/**
 * Find the latest successful Bamboo build result for the branch deploy,
 * and return the version file URL that matches the state of the file
 * for the deployed build.
 *
 * 1. Load the plan results
 *   - e.g. https://confluence-cloud-bamboo.internal.atlassian.com/rest/api/latest/result/CONFMICRO-CFCPB14350-BUILDBRANCH
 * 2. Find the latest successful match by reading the result.buildState as either 'Failed' or 'Successful'
 *   - e.g. https://confluence-cloud-bamboo.internal.atlassian.com/rest/api/latest/result/CONFMICRO-CFCPB14350-BUILDBRANCH-64
 * 3. Load the matching successful build number result and request the `vcsRevisionKey` to get the commit SHA
 *   - e.g. https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/browse/.atlaskit-version?until=22c5d4f907799d07219956947da19ba78c2174f3
 * 4. Use the commit SHA to construct the version file URL.
 */
export async function getVersionFileUrlForLastSuccessfulDeployment(
  pageIndex = 0,
  pageSize = 40,
): Promise<{ versionFileUrl: string; buildUrl: string } | undefined> {
  const headers = getBambooHeaders();
  const planResultsUrl = getBuildResultUrl(undefined, { pageIndex, pageSize });
  console.log(
    `Read plan results ${
      pageIndex + 1
    } of ${maxPageRequests}:\n\t${planResultsUrl}`,
  );

  const buildResults: BambooResults = await fetch(planResultsUrl, { headers })
    .then(async (response) => response.json())
    .catch((error) => console.error(error));

  const successfulBuildMetadata = getBuildNumbersForLastSuccessfulBuild(
    buildResults,
  );
  if (!successfulBuildMetadata) {
    // Incremenent and try the next paged results...
    pageIndex = pageIndex + 1;
    const { size: numResults } = buildResults.results;
    const hasMoreResults = numResults === pageSize;
    if (pageIndex < maxPageRequests && hasMoreResults) {
      return await getVersionFileUrlForLastSuccessfulDeployment(
        pageIndex,
        pageSize,
      );
    }
    // Give up. Either the branch deploy is excessively stale, or something else has gone wrong.
    const pageLimit = hasMoreResults ? maxPageRequests : pageIndex;
    console.error(
      `Failed to find a successful build within ${pageLimit} pages (up to ${
        pageSize * pageLimit
      } results):\n\tUnable to obtain version file without one.`,
    );
    return;
  }
  const { latestBuildNumber, deployedBuildNumber } = successfulBuildMetadata;
  const buildResultUrl = getBuildResultUrl(deployedBuildNumber);
  const buildResult: BambooBuildResult = await fetch(buildResultUrl, {
    headers,
  })
    .then(async (response) => response.json())
    .catch((error) => console.error(error));
  console.log(`Read build result:\n\t${buildResultUrl}`);
  const deployedConfluenceCommit = buildResult.vcsRevisionKey;
  console.log(`\nLatest build number: ${latestBuildNumber}
Last successful build number: ${deployedBuildNumber}, for confluence-frontend commit ${deployedConfluenceCommit}
${latestBuildNumber - deployedBuildNumber} builds behind.\n`);
  const BRANCH_DEPLOY_VERSION_FILENAME =
    // e.g. '.atlassian-frontend-version';
    process.env.PF_BRANCH_DEPLOY_VERSION_FILE || '.unknown-version';
  const versionFileUrl = getVersionFileUrl(
    BRANCH_DEPLOY_VERSION_FILENAME,
    deployedConfluenceCommit,
  );
  return { versionFileUrl, buildUrl: buildResultUrl };
}

/**
 * Read the Product Integrator version file and return its metadata
 */
export async function loadVersionFile(url: string) {
  const headers = getStashHeaders();
  console.log(`Load branch deployment metadata from url:\n\t${url}`);
  const versionMetadata = await fetch(url, {
    headers,
  })
    .then(async (response) => response.json())
    .then((json) => parseVersionFile(json as BranchDeployVersionFile))
    .catch((error) => console.error(error));
  if (versionMetadata && versionMetadata.commitHash) {
    console.log(
      'Deployed atlassian-frontend commit:\n\t',
      versionMetadata.commitHash,
    );
    return versionMetadata;
  }
  return;
}

/**
 * Read the latest depoyed confluence-frontend branch metadata and
 * return the atlassian-frontend commit hash that triggered it.
 *
 * NOTE:
 * It aborts after 3 paginated results if it hasn't found a successful
 * build. This is unlikely to eventuate unless the branch deploy has
 * been broken for over a fortnight.
 */
export const getConfluenceDeploymentInfo = async (): Promise<
  ConfluenceDeploymentInfo | undefined
> => {
  checkEnvironmentVariables(process.env, [
    'STASH_USER_BOT',
    'STASH_TOKEN_BOT',
    'CONFLUENCE_BAMBOO_TOKEN',
    'PF_BRANCH_BUILD_BAMBOO_KEY',
    'PF_BRANCH_DEPLOY_VERSION_FILE',
  ]);
  const meta = await getVersionFileUrlForLastSuccessfulDeployment();
  if (meta) {
    const version = await loadVersionFile(meta.versionFileUrl);
    const { buildUrl } = meta;
    return {
      ...(version || { commitHash: '', branchIsModified: true }),
      buildRestUrl: buildUrl,
      buildBrowseUrl: buildUrl
        .substr(0, buildUrl.length - 5)
        .replace('rest/api/latest/result', 'browse'),
    };
  }
  return undefined;
};

const parseVersionFile = (
  meta: BranchDeployVersionFile,
): BranchDeployMetadata => {
  const { branchIsModified } = meta;
  // Supports product integrator 1.0 and 2.0 version files
  const commitHash =
    'afCommitHash' in meta ? meta.afCommitHash : meta.akCommitHash;
  return {
    commitHash,
    branchIsModified,
  };
};

const getBuildNumbersForLastSuccessfulBuild = (data: BambooResults) => {
  if (!data || !data.results || data.results.result.length === 0) {
    // Either something has gone wrong, or you've traversed all the way
    // back to the start of the paginated results.
    console.warn('Missing data. Unable to check for successful builds.');
    return;
  }
  const latestSuccessfulBuild = data.results.result.find(
    (result: { state: 'Successful' | 'Failed' }) =>
      result.state === 'Successful',
  );
  if (!latestSuccessfulBuild) {
    return;
  }
  return {
    latestBuildNumber: data.results.result[0].number,
    deployedBuildNumber: latestSuccessfulBuild.number,
  };
};
