export const DEFAULT_VARIABLES = [
  'CI',
  'BITBUCKET_BUILD_NUMBER',
  'BITBUCKET_CLONE_DIR',
  'BITBUCKET_COMMIT',
  'BITBUCKET_WORKSPACE',
  'BITBUCKET_PROJECT_UUID',
  'BITBUCKET_PROJECT_KEY',
  'BITBUCKET_REPO_SLUG',
  'BITBUCKET_REPO_UUID',
  'BITBUCKET_REPO_FULL_NAME',
  'BITBUCKET_BRANCH',
  'BITBUCKET_TAG',
  'BITBUCKET_BOOKMARK',
  'BITBUCKET_PR_ID',
  'BITBUCKET_PR_DESTINATION_BRANCH',
  'BITBUCKET_DEPLOYMENT_ENVIRONMENT',
  'BITBUCKET_DEPLOYMENT_ENVIRONMENT_UUID',
  'BITBUCKET_PARALLEL_STEP',
  'BITBUCKET_PARALLEL_STEP_COUNT',
  'BITBUCKET_GIT_HTTP_ORIGIN',
  'BITBUCKET_GIT_SSH_ORIGIN',
  'BITBUCKET_EXIT_CODE',
];

export const FEATURED_PIPES = [
  'opsgenie send alert',
  'slack notify',
  'aws s3 deploy',
  'sonarcloud scan',
  'aws elastic beanstalk deploy',
  'aws codedeploy',
  'heroku deploy',
  'firebase deploy',
  'hoogle app engine deploy',
  'snyk scan',
];

export const ALL_CATEGORY = 'All';
export const FEATURED_CATEGORY = 'Featured';
export const RECENTLY_ADDED_CATEGORY = 'Recently added';

export const DOCS_CODE_INSIGHTS =
  'https://confluence.atlassian.com/display/BITBUCKET/Code+insights';
export const DOCS_WRITE_A_PIPE =
  'https://confluence.atlassian.com/bitbucket/how-to-write-a-pipe-for-bitbucket-pipelines-966051288.html';

export const BIDI_CHARS_REGEX = /([\u202A])|([\u202B])|([\u202C])|([\u202D])|([\u202E])|([\u2066])|([\u2067])|([\u2068])|([\u2069])/;
