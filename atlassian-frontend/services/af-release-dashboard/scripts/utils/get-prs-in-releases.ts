import { Release } from '../../types/releases';
import { validateEnvVars as checkEnvironmentVariables } from '@atlaskit/build-utils/guards';
import getPrsInReleaseAFP, {
  PrMetadata,
} from '@atlaskit/scheduled-releases/scripts/getPrsInRelease';

export interface GetPullRequestsInReleaseOptions {
  since?: string;
}

export const createPullRequestsInReleaseFactory = (releaseNames: string[]) => {
  checkEnvironmentVariables(process.env, [
    'BITBUCKET_USER',
    'BITBUCKET_PASSWORD',
  ]);
  const auth = {
    username: process.env.BITBUCKET_USER,
    password: process.env.BITBUCKET_PASSWORD,
  };
  return {
    async getPullRequestsInRelease(
      releaseName: string,
      options: GetPullRequestsInReleaseOptions = {},
    ): Promise<PrMetadata[]> {
      const releaseIndex = releaseNames.findIndex(
        (name) => name === releaseName,
      );
      const nextRelease = releaseNames[releaseIndex - 1];

      let nextReleaseStartTag = nextRelease
        ? `next-release-start-${nextRelease}`
        : undefined;

      const { pullRequests } = await getPrsInReleaseAFP(releaseName, auth, {
        proxyReleaseEndTag: nextReleaseStartTag,
        useDevelop: !nextReleaseStartTag,
        forceFetch: true,
        since: options.since,
      });

      return pullRequests;
    },
  };
};

export const getPRsInReleases = async (
  releaseNames: string[],
): Promise<Release[]> => {
  const { getPullRequestsInRelease } = createPullRequestsInReleaseFactory(
    releaseNames,
  );
  let releasesWithPrs = [];
  for (const releaseName of releaseNames) {
    const pullRequests = await getPullRequestsInRelease(releaseName);

    releasesWithPrs.push({
      name: releaseName,
      pullRequests,
    });
  }
  return releasesWithPrs;
};
