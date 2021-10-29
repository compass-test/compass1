interface Config {
  /** Bitbucket org/repo-name */
  repository: string;

  /** The authorised ASAP issuers for authenticating requests */
  allowedIssuers: Array<string>;

  /** Allow the service to add reviewers to PRs */
  allowAddReviewers: boolean;

  /** Allow the service to add comments on PRs */
  allowAddComment: boolean;

  /** Include the author when determining team participation in a PR */
  includeAuthor: boolean;

  /** Optional footer to include on PR comments */
  commentFooter?: string;

  /** Branch prefixes for the service to ignore (e.g. 'merge-branch/') */
  ignoreBranchPrefixes?: Array<string | RegExp>;

  /** PR title tags for the service to ignore (e.g. '[WIP]') */
  ignorePrTags?: Array<string | RegExp>;
}

const config: Config = {
  repository: 'atlassian/atlassian-frontend',
  allowedIssuers: ['micros/package-ownership'],
  allowAddReviewers: true,
  allowAddComment: true,
  includeAuthor: true,
  commentFooter:
    'Reviewers are chosen randomly based on team ownership, if you are not the best person for review, please assign someone else from your team.  \n' +
    'Additionally, the author can prevent reviewers from being added by including `WIP` in the PR title.  \n' +
    'For more information on this process, please see our blog http://go.atlassian.com/af-package-ownership.  \n' +
    '[Submit feedback here](https://docs.google.com/forms/d/e/1FAIpQLSdhBzN1ApPc357BOWcWvZeIR-uKlGFagQUZSWhWrUgXC_wODA/viewform?usp=sf_link), or on the blog.',
  ignoreBranchPrefixes: [
    'release-candidate/',
    'merge-branch/',
    'afp-repo-change/',
  ],
  ignorePrTags: [/\bWIP\b/i],
};

if (process.env.MICROS_ENV !== 'prod-west') {
  config.repository = 'jackrgardner/atlassian-frontend-landkid-test-repo';
  config.includeAuthor = false;
}

export { config };
