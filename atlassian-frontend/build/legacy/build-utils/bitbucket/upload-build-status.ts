/**
 * This is a CLI tool for creating and updating build statuses on a commit
 * The main function is exposed programmatically as well
 * It acts as an opinionated interface to the BuildStatusClient
 * Behaviour:
 *  Using the --update flag:
 *    - Required client fields: key and state
 *    - Default fields if run in CI
 *      - key is found from status for current pipeline
 *        - only works if there is one existing status for the current pipeline
 *      - state is state of current pipeline (should always be INPROGRESS)
 *    - Can specify the url of the status for updating, otherwise defaults to url of current pipeline
 *  Not using the --update flag:
 *    - Required client fields: name and state
 *      - creates default key from "{name} - {commit}"
 *    - Default fields if run in CI
 *      - state is based off $BITBUCKET_EXIT_CODE
 *      - url is url of current pipeline
 *
 *  NOTE: LIMITATIONS OF UPDATING BUILD STATUSES
 *    name and description are not persisted,
 *    if you use this script to change these values during the pipeline,
 *    the state changes (INPROGRESS -> SUCCESSFUL) will revert them
 *    see: https://hello.atlassian.net/wiki/spaces/~904291390/pages/749161906/Investigation+Build+Statuses
 */
import meow from 'meow';
import { BuildStatusClient } from './BuildStatusClient';
import { BuildStatusOpts } from './types';

type Opts = BuildStatusOpts & {
  commit?: string;
  update?: boolean;
  rename?: boolean;
};

type EnvironmentVariables = {
  BITBUCKET_COMMIT: string;
  BITBUCKET_REPO_FULL_NAME: string;
  BITBUCKET_USER: string;
  BITBUCKET_PASSWORD: string;
  BITBUCKET_BRANCH: string;
  BITBUCKET_BUILD_NUMBER: string;
  BITBUCKET_EXIT_CODE: string;
};

function validateEnvironmentVariables(
  env: Partial<EnvironmentVariables>,
  opts: Opts,
): env is EnvironmentVariables {
  const required = [
    env.BITBUCKET_USER,
    env.BITBUCKET_PASSWORD,
    env.BITBUCKET_REPO_FULL_NAME,
    opts.commit || env.BITBUCKET_COMMIT,
  ];

  const requiredForUpload = [
    // for creating default url
    opts.url || env.BITBUCKET_BUILD_NUMBER,
    // for default state
    opts.state || env.BITBUCKET_EXIT_CODE,
  ];

  const requiredForUpdate = [
    // branch and build number for creating default pipeline name to search for
    opts.name || env.BITBUCKET_BRANCH,
    opts.name || env.BITBUCKET_BUILD_NUMBER,
  ];

  return required
    .concat(opts.update ? requiredForUpdate : requiredForUpload)
    .every(val => !!val);
}

export default async function uploadBuildStatus(opts: Opts) {
  if (!validateEnvironmentVariables(process.env, opts)) {
    throw new Error('Pipelines variables are not defined');
  }

  const {
    BITBUCKET_COMMIT,
    BITBUCKET_REPO_FULL_NAME,
    BITBUCKET_USER,
    BITBUCKET_PASSWORD,
    BITBUCKET_BRANCH,
    BITBUCKET_BUILD_NUMBER,
    BITBUCKET_EXIT_CODE,
  } = process.env;

  const buildStatusClient = new BuildStatusClient({
    auth: {
      username: BITBUCKET_USER,
      password: BITBUCKET_PASSWORD,
    },
    repoFullName: BITBUCKET_REPO_FULL_NAME,
    commit: opts.commit || BITBUCKET_COMMIT,
  });

  const { update, rename, ...buildStatusOpts } = opts;

  const url =
    buildStatusOpts.url ||
    `http://bitbucket.org/${BITBUCKET_REPO_FULL_NAME}/addon/pipelines/home#!/results/${BITBUCKET_BUILD_NUMBER}`;

  if (update) {
    let key: string | undefined;
    let state: BuildStatusOpts['state'];

    if (buildStatusOpts.key) {
      if (!buildStatusOpts.state) {
        throw new Error('--state needs to be defined if --key is');
      } else {
        key = buildStatusOpts.key;
        state = buildStatusOpts.state;
      }
    } else {
      let name =
        buildStatusOpts.name ||
        `Pipeline #${BITBUCKET_BUILD_NUMBER} for ${BITBUCKET_BRANCH}`;

      const statuses = await buildStatusClient.getStatuses({
        q: `name = "${name}"`,
      });

      if (statuses.size === 0) {
        throw new Error(`No statuses were found with the name ${name}`);
      }
      if (statuses.size > 1) {
        throw new Error(`Multiple statuses were found with the name ${name}`);
      }

      key = statuses.values[0].key;
      state = statuses.values[0].state;
      console.log('Found build status with', { key, state });

      name = rename ? `${buildStatusOpts.name} [OPT]` : name;

      if (state !== 'SUCCESSFUL') {
        console.log(
          'Note: changes will not persist across state changes made by the pipeline (e.g. INPROGRESS -> SUCCESSFUL)',
        );
      }

      await buildStatusClient.updateBuildStatus({
        url,
        key,
        state,
        ...buildStatusOpts,
        name,
      });
    }
  } else {
    const state =
      buildStatusOpts.state ||
      (BITBUCKET_EXIT_CODE === '0' ? 'SUCCESSFUL' : 'FAILED');

    await buildStatusClient.uploadBuildStatus({
      url,
      state,
      ...buildStatusOpts,
    });
  }
}

if (require.main === module) {
  const cli = meow(
    `
      Usage
        yarn ts-node upload-build-status.ts
      Options
        --commit              build commit, default to $BITBUCKET_COMMIT
        --state               state of the build, defaults to state of current pipeline if --update, otherwise uses $BITBUCKET_EXIT_CODE
        --key                 unique key of the build, default to key of current pipeline
        --name                name of the build, required for uploading but not --update
        --description         description of the build
        --url                 url the status should redirect to, defaults to url of current pipeline
        --update              whether to update an existing build status instead of create a new one
        --rename              rename a build status use with --update - only to unblock pull-request by prepending [OPT] to the build name
  `,
    {
      description:
        'Update the build information (name, status, description, url, state)',
      flags: {
        commit: {
          type: 'string',
        },
        state: {
          type: 'string',
        },
        key: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        rename: {
          type: 'boolean',
        },
        url: {
          type: 'string',
        },
        update: {
          type: 'boolean',
        },
      },
    },
  );

  const opts = cli.flags as Opts;

  if (!opts) {
    console.log(cli.showHelp());
  }

  uploadBuildStatus(opts).catch(e => {
    console.error('Unable to update build status');
    console.error(e.response ? JSON.stringify(e.response.data) : e);
  });
}
