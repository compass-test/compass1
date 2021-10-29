interface Product {
  /** ID of the product - this should match what is provided in REST API calls */
  id: string;
  /** Human readable name of the product */
  name: string;
  /** The source repository URL of the product. Used for linking to their repo. */
  repoUrl: string;
  /** Function that gnenerates a product branch deploy link, given a branch name */
  branchDeployLink?: (branchName: string) => string;
}
interface Config {
  /** Bitbucket org/repo-name */
  repository: string;
  /** The authorised ASAP issuers for authenticating requests */
  allowedIssuers: Array<string>;
  /** Product specific metadata required by the service */
  products: Array<Product>;
  /** If non-empty array, filters integrator status reporting to branches matching the regular expressions */
  branchFilters?: Array<RegExp>;
}

const config: Config = {
  repository: 'atlassian/atlassian-frontend',
  allowedIssuers: ['micros/af-product-integration'],
  products: [
    {
      id: 'confluence',
      name: 'Confluence',
      repoUrl:
        'https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend',
      branchDeployLink: branchName =>
        `https://hello.atlassian.net/wiki/?useFrontendBranch=${branchName}`,
    },
    {
      id: 'jira',
      name: 'Jira',
      repoUrl:
        'https://stash.atlassian.com/projects/JIRACLOUD/repos/jira-frontend',
      branchDeployLink: branchName =>
        `https://jdog.jira-dev.com?jfeFragment=${branchName}`,
    },
  ],
  // Limit this to AFP branches only for now
  branchFilters: [],
};

export { config };
