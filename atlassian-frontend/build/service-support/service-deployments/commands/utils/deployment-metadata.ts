import * as bolt from 'bolt';
import getReleasePlan from '@changesets/get-release-plan';
import { getTransitiveDependencies } from '@atlaskit/build-utils/packages';
import { getChangesetFiles } from '@atlaskit/build-utils/git';
import {
  AFPackage,
  AFPackageJson,
  DeploymentConfig,
  GlobalServiceConfig,
} from '@atlaskit/build-utils/types';

export type DeploymentMetadata = Array<{
  package: string;
  pipeline: string;
  env: string;
  triggeredBy: Array<string>;
}>;

type DeploymentOpts = DeploymentConfig & GlobalServiceConfig;

type EnrichedService = AFPackage & {
  deploymentOpts: DeploymentOpts;
  dependencies: string[];
};

export enum DeploymentType {
  MASTER_CONTINUOUS,
  BRANCH,
}

function getCustomPipeline(service: EnrichedService) {
  if (
    service.deploymentOpts.customPipeline &&
    // Services that can use custom pipelines need to be approved by AFP
    ['@atlassian/analytics-auto-push'].includes(service.name)
  ) {
    return service.deploymentOpts.customPipeline;
  }
  return undefined;
}

function getPipelineForEnv(env: string) {
  if (env === 'statlas') {
    return 'statlas-branch-deploy-service';
  }
  return env.startsWith('prod') ? 'deploy-service-prod' : 'deploy-service-dev';
}

async function getChangedPackagesFromChangesets(dir: string, onMaster = true) {
  let changedChangesetFiles: string[] = [];
  if (!onMaster) {
    changedChangesetFiles = await getChangesetFiles({
      cwd: dir,
    });
  }
  return getReleasePlan(dir).then(({ changesets }) =>
    changesets.reduce((acc: string[], { id, releases }) => {
      if (!onMaster && !changedChangesetFiles.some(file => file.includes(id))) {
        return acc;
      }
      return acc.concat(releases.map(release => release.name));
    }, []),
  );
}

async function getDeploymentDependencies(
  pkg: AFPackage,
  deploymentOpts: DeploymentOpts,
  dir: string,
) {
  const dependencies = [pkg.name];
  if (!deploymentOpts.deployOnDependencies) {
    return dependencies;
  }

  switch (deploymentOpts.deployOnDependencies.type) {
    case 'direct':
      dependencies.push(...Object.keys(pkg.config.dependencies || {}));
      break;
    case 'transitive':
      dependencies.push(
        ...(await getTransitiveDependencies(pkg.name, {
          cwd: dir,
          excludedTypes: [
            'devDependencies',
            'peerDependencies',
            'optionalDependencies',
          ],
          depth: deploymentOpts.deployOnDependencies.depth,
        })),
      );
      break;
    case 'explicit':
      dependencies.push(...deploymentOpts.deployOnDependencies.dependencies);
      break;
  }

  return dependencies;
}

/**
 * Fetch the declared options for a specific type of deployment from the `af:service` config
 * @param pkg The name of the service's package
 * @param deploymentType The type of deployment to get the options for
 * @returns An object that contains all the package info but surfaces required deployment options
 */
export function getDeploymentOptions(
  pkg: AFPackage,
  deploymentType: DeploymentType,
) {
  const afServices = pkg.config['af:services'];
  if (!afServices) {
    return undefined;
  }

  const { master, branch, ...globalConfig } = afServices;

  let deploymentOpts;
  switch (deploymentType) {
    case DeploymentType.MASTER_CONTINUOUS:
      deploymentOpts = master && master.continuous;
      break;
    case DeploymentType.BRANCH:
      deploymentOpts = branch;
      break;
  }
  if (deploymentOpts) {
    deploymentOpts = {
      ...deploymentOpts,
      ...globalConfig,
    };
  }
  return deploymentOpts as DeploymentOpts | undefined;
}

async function generateEnrichedServices(
  services: AFPackage[],
  deploymentType: DeploymentType,
  dir: string,
): Promise<EnrichedService[]> {
  const enrichedServices = [];

  for (const service of services) {
    const deploymentOpts = getDeploymentOptions(service, deploymentType);
    if (!deploymentOpts) {
      continue;
    }
    const dependencies = await getDeploymentDependencies(
      service,
      deploymentOpts,
      dir,
    );
    enrichedServices.push({
      ...service,
      deploymentOpts,
      dependencies,
    });
  }

  return enrichedServices;
}

/**
 * Generates the metadata for all required deployments
 * @param type The type of deployment that is occuring
 * @param cwd Used for fetching changesets, the default is the root of the repo and should only be overridden for testing
 */
export async function getServiceDeploymentMetadata(
  deploymentType: DeploymentType,
  opts: {
    cwd?: string;
    onMaster?: boolean;
  } = {},
): Promise<DeploymentMetadata> {
  const dir = opts.cwd || (await bolt.getProject()).dir;

  const changedPackages = await getChangedPackagesFromChangesets(
    dir,
    opts.onMaster,
  );

  const services = await bolt.getWorkspaces<AFPackageJson>({
    cwd: dir,
    onlyFs: 'services/*',
  });

  const enrichedServices = await generateEnrichedServices(
    services,
    deploymentType,
    dir,
  );

  return enrichedServices.reduce(
    (deploymentMetadata: DeploymentMetadata, service) => {
      // List of packages that have triggered deployment for this service
      const triggeredBy = service.dependencies.filter(dep =>
        changedPackages.includes(dep),
      );

      if (triggeredBy.length) {
        const { env: envConfig } = service.deploymentOpts;
        const envs = Array.isArray(envConfig) ? envConfig : [envConfig];

        return [
          ...deploymentMetadata,
          ...envs.map(env => ({
            package: service.name,
            pipeline: getCustomPipeline(service) || getPipelineForEnv(env),
            env,
            triggeredBy,
          })),
        ];
      }

      return deploymentMetadata;
    },
    [],
  );
}
