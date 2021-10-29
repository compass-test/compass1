import { EnvironmentVariables } from '../types';

/* Ensures all required environment variables exist */
export function validateEnvVariables(
  processEnv: Partial<EnvironmentVariables>,
): asserts processEnv is EnvironmentVariables {
  const errors = [];
  // Check for afp-repo-bot credentials
  if (!processEnv.BITBUCKET_USER || !processEnv.BITBUCKET_PASSWORD) {
    errors.push(
      'Bitbucket credentials BITBUCKET_USER and/or BITBUCKET_PASSWORD missing',
    );
  }

  // Check for custom token that allows us to land the PR
  if (!processEnv.BOT_APPROVER_USER || !processEnv.BOT_APPROVER_PASSWORD) {
    errors.push(
      'Credentials for user to approve merge to master BOT_APPROVER_USER and/or BOT_APPROVER_PASSWORD are missing',
    );
  }

  // Check for branch that pipeline is executed in
  if (
    !processEnv.BITBUCKET_BRANCH ||
    !processEnv.BITBUCKET_REPO_FULL_NAME ||
    !processEnv.BITBUCKET_BUILD_NUMBER
  ) {
    errors.push(
      'Pipelines variables BITBUCKET_BRANCH, BITBUCKET_REPO_FULL_NAME, and/or BITBUCKET_BUILD_NUMBER are missing',
    );
  }

  // Check for custom token that allows us to land the PR
  if (!processEnv.LANDKID_CUSTOM_TOKEN) {
    errors.push('LANDKID_CUSTOM_TOKEN for landing the pull request is missing');
  }

  // Bearer Token and incoming webhook for authenticating slack requests
  if (
    !processEnv.AFP_SLACK_TOKEN ||
    !processEnv.SLACK_RELEASE_MANAGERS_CHANNEL
  ) {
    errors.push(
      'AFP_SLACK_TOKEN and/or SLACK_RELEASE_MANAGERS_CHANNEL for Slack Bot requests are missing',
    );
  }

  // Check for Atlassian credentials
  if (!processEnv.ATLASSIAN_USER || !processEnv.ATLASSIAN_PASSWORD) {
    errors.push(
      'ATLASSIAN_USER and ATLASSIAN_PASSWORD for fetching the release manager from the FABDODGEM project are missing',
    );
  }

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }
}
