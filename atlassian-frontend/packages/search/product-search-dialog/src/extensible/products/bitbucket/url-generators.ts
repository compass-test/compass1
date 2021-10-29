import { BitbucketURLGenerators } from './types';

const getBitbucketBaseURL = () => {
  const hostname = window.location.hostname;
  if (hostname.includes('jira-dev.com') || hostname.startsWith('localhost')) {
    return 'https://staging.bb-inf.net';
  }

  return 'https://bitbucket.org';
};

/**
 * Generates URL functions for the Bitbucket tab, with appropriate absolute URLs.
 *
 * @returns functions for generating Bitbucket URLs
 */
export const bitbucketURLGenerators = (
  overrides?: Partial<BitbucketURLGenerators>,
): BitbucketURLGenerators => {
  const viewAllLinkGenerator = (query: string) =>
    `${getBitbucketBaseURL()}/dashboard/repositories?search=${encodeURIComponent(
      query,
    )}`;

  const urlGeneratorForNoResultsScreen = (query?: string) =>
    query
      ? `${getBitbucketBaseURL()}/dashboard/repositories?search=${encodeURIComponent(
          query,
        )}`
      : `${getBitbucketBaseURL()}/dashboard/repositories`;

  const codeSearchUrlGenerator = (query: string) =>
    query
      ? `${getBitbucketBaseURL()}/search?q=${encodeURIComponent(query)}`
      : `${getBitbucketBaseURL()}/search`;

  return {
    viewAllLinkGenerator:
      overrides?.viewAllLinkGenerator || viewAllLinkGenerator,
    urlGeneratorForNoResultsScreen:
      overrides?.urlGeneratorForNoResultsScreen ||
      urlGeneratorForNoResultsScreen,
    codeSearchUrlGenerator:
      overrides?.codeSearchUrlGenerator || codeSearchUrlGenerator,
  };
};
