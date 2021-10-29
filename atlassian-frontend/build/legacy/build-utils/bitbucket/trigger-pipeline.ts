import meow from 'meow';
import chalk from 'chalk';
// @ts-ignore js file
import { getCommitsBetween } from '../git';
import uploadBuildStatus from './upload-build-status';
import { PipelinesClient } from './PipelinesClient';
import { Default } from '../types';

type EnvironmentVariables = {
  BITBUCKET_USER: string;
  BITBUCKET_PASSWORD: string;
  BITBUCKET_REPO_FULL_NAME: string;
  BITBUCKET_BRANCH?: string;
  BITBUCKET_COMMIT?: string;
};

function validateEnvironmentVariables(
  env: Partial<EnvironmentVariables>,
): env is EnvironmentVariables {
  return !!(
    env.BITBUCKET_USER &&
    env.BITBUCKET_PASSWORD &&
    env.BITBUCKET_REPO_FULL_NAME
  );
}

type Flags = {
  /** Pipeline name as per bitbucket-pipelines.yml */
  pipeline: string;
  /** Branch to run on, defaults to $BITBUCKET_BRANCH */
  branch?: string;
  /** Commit to run against, defaults to $BITBUCKET_COMMIT */
  commit?: string;
  /** Create an in-progress build status with the specified name */
  createStatus?: string;
  /** Array of key/value pairs representing the pipeline variables of the pipeline as defined in bitbucket-pipelines.yml */
  variables?: Array<{ key: string; value: string }>;
  /** Poll and wait for the triggered pipeline to finish */
  poll?: boolean;
  /** Only trigger the pipeline if this commit is the latest on the specified branch */
  onlyLatest?: boolean;
};

export default async function main(
  userFlags: Default<Flags, 'branch'>,
  showHelp = () => {},
): Promise<{ success: boolean; duration?: number; skipped?: boolean }> {
  if (!validateEnvironmentVariables(process.env)) {
    throw new Error('Pipelines variables are not set');
  }

  const defaultFlags = {
    branch: process.env.BITBUCKET_BRANCH,
    commit: process.env.BITBUCKET_COMMIT,
  };

  const flags = { ...defaultFlags, ...userFlags };

  const {
    BITBUCKET_USER,
    BITBUCKET_PASSWORD,
    BITBUCKET_REPO_FULL_NAME,
  } = process.env;

  if ((!flags.branch && !flags.commit) || !flags.pipeline) {
    console.log(showHelp());
    throw new Error(
      `Missing branch (${flags.branch}) or pipeline (${flags.pipeline}) args`,
    );
  }

  if (flags.onlyLatest) {
    if (!flags.branch) {
      throw new Error('Must specify `branch` with `onlyLatest` flag');
    }
    const commits = await getCommitsBetween(
      flags.commit || 'HEAD',
      `origin/${flags.branch}`,
    );
    if (commits.length > 0) {
      console.log('Skipping pipeline due to newer commits being pushed');
      return { success: true, skipped: true };
    }
  }

  const pipelinesClient = new PipelinesClient({
    auth: {
      username: BITBUCKET_USER,
      password: BITBUCKET_PASSWORD,
    },
    repoFullName: BITBUCKET_REPO_FULL_NAME,
  });

  const start = Date.now();
  const pipeline = await pipelinesClient.trigger({
    branch: flags.branch,
    commit: flags.commit,
    pipeline: flags.pipeline,
    variables: flags.variables,
  });

  const url = pipelinesClient.getUrl(pipeline.build_number);
  console.log(
    chalk.greenBright(
      `Successfully triggered "${flags.pipeline}" pipeline: ${chalk.bold(url)}`,
    ),
  );

  if (flags.createStatus) {
    await uploadBuildStatus({
      name: flags.createStatus,
      url,
      state: 'INPROGRESS',
    });
  }

  if (flags.poll) {
    console.log('Polling pipeline...');
    const completedPipeline = await pipelinesClient.waitToFinish(pipeline.uuid);
    if (completedPipeline.state.result.name !== 'SUCCESSFUL') {
      console.log(chalk.redBright(`Pipeline failed, see: ${chalk.bold(url)}`));
      return { success: false };
    }
  }
  return { success: true, duration: Date.now() - start };
}

if (require.main === module) {
  const cli = meow(
    `Usage: yarn ts-node trigger-pipeline.ts
      --branch=[branch to run on]
      --commit=[commit to run on]
      --pipeline=[name of pipeline to trigger]
      --createStatus=[optional: name of in-progress build status that will be created]
      --variable=[optional: specify variables for pipelines in the form KEY:VALUE]
      --poll [optional: script will poll for the triggered pipeline to finish and exit according to the status]`,
    {
      description: 'Trigger a Bitbucket Pipeline',
      flags: {
        branch: {
          type: 'string',
        },
        commit: {
          type: 'string',
        },
        pipeline: {
          type: 'string',
        },
        createStatus: {
          type: 'string',
        },
        variable: {
          type: 'string',
        },
        poll: {
          type: 'boolean',
        },
      },
    },
  );
  const { variable, ...flags } = cli.flags;
  if (variable) {
    const normalisedVariables = Array.isArray(variable)
      ? (variable as string[])
      : [variable];
    flags.variables = normalisedVariables.map(varStr => {
      const [key, value] = varStr.split(':');
      return { key, value };
    });
  }
  main(flags)
    .then(res => {
      if (!res.success) {
        process.exit(1);
      }
    })
    .catch(err => {
      console.log(chalk.redBright('Failed to trigger pipeline'));
      const error = err.response
        ? {
            status: err.response.status,
            statusText: err.response.statusText,
            data: err.response.data,
          }
        : err;
      console.error(error);
      process.exit(1);
    });
}
