import meow from 'meow';

export const cutReleaseCli = meow(
  `
Usage
    $ setup-release <releaseName> <nextReleaseName>

  Options
    --dry-run, -d         Perform a dry run.
    --project             A project key that limits jira issue updates to those belonging to the project.
    --develop             Can be used if an RC branch does not exist yet, in which case it will include all PRs merged into origin/develop.
    --force               Used to refetch PR information from Bitbucket. PR information is cached otherwise.

  Environment Variables:
    - ATLASSIAN_USER (required): Atlassian username to auth against REST API - this should be an *email address*
    - ATLASSIAN_PASSWORD (required): Atlassian API token to auth against REST API - generated from https://id.atlassian.com/manage-profile/security/api-tokens
    - BITBUCKET_USER (required): Bitbucket username to auth against Bitbucket REST API - this should be a username, not email (TODO check)
    - BITBUCKET_PASSWORD (required): Bitbucket password to auth against Bitbucket REST API - generated as an app password with pull:read, pull:write
    - AFP_SLACK_TOKEN (required): Slack OAuth2 token to send messages as the AFP Bot

  Examples
    $ setup-release
`,
  {
    description: 'Sets up a new release',
    flags: {
      dev: {
        type: 'boolean',
      },
      dryRun: {
        type: 'boolean',
        alias: 'd',
      },
      project: {
        type: 'string',
      },
      force: {
        type: 'boolean',
      },
      develop: {
        type: 'boolean',
      },
    },
  },
);
