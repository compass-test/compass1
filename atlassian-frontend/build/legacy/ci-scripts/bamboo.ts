import meow from 'meow';
import {
  getBuildIdentifier,
  getLatestBuildStatus,
  getLatestBuildUrlInformation,
  searchJobsbyPlanKey,
  stopAllRunningBuilds,
  triggerProductBuild,
} from '@atlaskit/build-utils/bamboo';
import { getBranchName } from '@atlaskit/build-utils/git';

const branchPrefix = 'atlaskit-branch-deploy';

type EnvironmentVariables = {
  CONFLUENCE_BAMBOO_TOKEN: string;
  PRODUCT_CONFLUENCE_PLAN_URL: string;
};

type BambooOpts = {
  branch?: string;
  identifier?: string;
  token: string;
  trigger?: boolean;
  productCiUrl: string;
  stop?: boolean;
  status?: boolean;
};

async function createBranchName(prefix: string, branch?: string) {
  const afBranchName = branch ? branch : await getBranchName();
  return `${prefix}${afBranchName}`.replace(/\//g, '-');
}

function validateEnvironmentVariables(
  env: Partial<EnvironmentVariables>,
  opts: BambooOpts,
): env is EnvironmentVariables {
  const required = [opts.productCiUrl, opts.token];
  return required.every(val => !!val);
}

async function main() {
  const { BITBUCKET_BRANCH } = process.env;

  const cli = meow(
    `
      Usage
        yarn ts-node bamboo
      Options
        --branch              product branch name that needs the build to be triggered or stopped
        --identifier          identifer is either PROJECT-PLAN or PROJECT-PLAN-JOB
        --productCiUrl        bamboo rest API plan url
        --stop                stop an existing running build
        --status              return the latest build status for a particular branch name
        --token               token to trigger the build in bamboo
        --trigger             trigger the build in bamboo based on the "--productCiUrl", it will create a plan branch if needed
  `,
    {
      description:
        'Update the build information (name, status, description, url, state)',
      flags: {
        branch: {
          type: 'string',
        },
        identifier: {
          type: 'string',
        },
        productCiUrl: {
          type: 'string',
        },
        status: {
          type: 'boolean',
        },
        stop: {
          type: 'boolean',
        },
        token: {
          type: 'string',
        },
        trigger: {
          type: 'boolean',
        },
      },
    },
  );

  const opts = cli.flags as BambooOpts;

  if (!validateEnvironmentVariables(process.env, opts)) {
    throw new Error('Pipelines variables are not set');
  }

  if (!opts) {
    console.log(cli.showHelp());
  }

  const productBranchName = opts.branch
    ? opts.branch
    : await createBranchName(branchPrefix, BITBUCKET_BRANCH);

  const defaultIdentifier = opts.identifier || '';

  const token = opts.token || '';

  const product_plan = opts.productCiUrl || '';

  let planUrl = '';

  if (product_plan) {
    [planUrl] = product_plan.split('/rest');
  } else {
    throw new Error('A plan url needs to be provided!');
  }

  if (opts.stop) {
    const identifier = await getBuildIdentifier(
      planUrl,
      defaultIdentifier,
      productBranchName,
      token,
    );

    const runningBuilds = await searchJobsbyPlanKey(planUrl, identifier, token);

    const { latestBuildIndex } = await getLatestBuildStatus(
      planUrl,
      defaultIdentifier,
      productBranchName,
      token,
    );

    await stopAllRunningBuilds(
      planUrl,
      runningBuilds,
      productBranchName,
      token,
      latestBuildIndex,
    );
    if (opts.trigger) {
      console.log(
        '--stop and --trigger are mutually exclusive. Ignoring --trigger',
      );
    }
  } else if (opts.trigger) {
    try {
      await triggerProductBuild(product_plan, productBranchName, token);
    } catch (err) {
      console.error(
        `Something went wrong while triggering the build for ${productBranchName} and plan: ${planUrl}.`,
      );
    }
  }

  if (opts.status) {
    const {
      buildState,
      lifeCycleState,
      latestBuildUrl,
    } = await getLatestBuildUrlInformation(
      planUrl,
      productBranchName,
      defaultIdentifier,
      token,
    );

    console.info(
      `The latest build information for ${productBranchName} is:\n
        BuildStatus: ${buildState}
        BuildState: ${lifeCycleState}
        BuildUrl: ${latestBuildUrl}
        .`,
    );
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
