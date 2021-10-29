import { copyFixtureIntoTempDir } from 'jest-fixtures';
import cases from 'jest-in-case';
import { default as writeChangeset } from '@changesets/write';
import { Release } from '@changesets/types';
import {
  getServiceDeploymentMetadata,
  DeploymentType,
  DeploymentMetadata,
} from '../../commands/utils/deployment-metadata';

let tempDir: string;
beforeEach(async () => {
  tempDir = await copyFixtureIntoTempDir(__dirname, 'services-bolt-project');
  jest.clearAllMocks();
});

const createChangesets = async (packages: string[]) => {
  const changeset = {
    summary: 'test changeset',
    releases: packages.map(name => ({ name, type: 'patch' })) as Release[],
  };
  await writeChangeset(changeset, tempDir);
};

type CaseOpts = {
  changesets: string[];
  deploymentType: DeploymentType;
  deploymentMetadata: DeploymentMetadata;
};

cases(
  'Generates Service Deployment Metadata',
  async ({ changesets, deploymentType, deploymentMetadata }: CaseOpts) => {
    await createChangesets(changesets);
    expect(
      await getServiceDeploymentMetadata(deploymentType, { cwd: tempDir }),
    ).toEqual(deploymentMetadata);
  },
  [
    {
      name: 'No changed packages',
      changesets: [],
      deploymentType: DeploymentType.MASTER_CONTINUOUS,
      deploymentMetadata: [],
    },
    {
      name: 'Services that have opted-in',
      changesets: [
        '@af/master-continuous',
        '@af/not-opted-in',
        '@atlaskit/foo',
      ],
      deploymentType: DeploymentType.MASTER_CONTINUOUS,
      deploymentMetadata: [
        {
          package: '@af/master-continuous',
          pipeline: 'deploy-service-prod',
          env: 'prod-west',
          triggeredBy: ['@af/master-continuous'],
        },
      ],
    },
    {
      name: 'Deployment type',
      changesets: ['@af/master-continuous', '@af/master-continuous-bd'],
      deploymentType: DeploymentType.BRANCH,
      deploymentMetadata: [
        {
          package: '@af/master-continuous-bd',
          pipeline: 'deploy-service-dev',
          env: 'ddev',
          triggeredBy: ['@af/master-continuous-bd'],
        },
      ],
    },
    {
      name: 'Correct branch deploy pipeline',
      changesets: [
        '@af/master-continuous-bd',
        '@af/master-continuous-statlas-bd',
      ],
      deploymentType: DeploymentType.BRANCH,
      deploymentMetadata: [
        {
          package: '@af/master-continuous-bd',
          pipeline: 'deploy-service-dev',
          env: 'ddev',
          triggeredBy: ['@af/master-continuous-bd'],
        },
        {
          package: '@af/master-continuous-statlas-bd',
          pipeline: 'statlas-branch-deploy-service',
          env: 'statlas',
          triggeredBy: ['@af/master-continuous-statlas-bd'],
        },
      ],
    },
    {
      name: 'Direct dependencies',
      changesets: ['@atlaskit/foo'],
      deploymentType: DeploymentType.BRANCH,
      deploymentMetadata: [
        {
          package: '@af/bd-direct-deps',
          pipeline: 'deploy-service-dev',
          env: 'stg-east',
          triggeredBy: ['@atlaskit/foo'],
        },
        {
          package: '@af/bd-transitive-deps',
          pipeline: 'deploy-service-dev',
          env: 'stg-east',
          triggeredBy: ['@atlaskit/foo'],
        },
      ],
    },
    {
      name: 'Transitive dependencies',
      changesets: ['@atlaskit/bar', '@atlaskit/fuzz'],
      deploymentType: DeploymentType.BRANCH,
      deploymentMetadata: [
        {
          package: '@af/bd-transitive-deps',
          pipeline: 'deploy-service-dev',
          env: 'stg-east',
          triggeredBy: ['@atlaskit/bar', '@atlaskit/fuzz'],
        },
      ],
    },
    {
      name: 'Explicit dependencies',
      changesets: ['@atlaskit/bar', '@atlaskit/fuzz'],
      deploymentType: DeploymentType.MASTER_CONTINUOUS,
      deploymentMetadata: [
        {
          package: '@af/master-continuous-explicit-deps',
          pipeline: 'deploy-service-prod',
          env: 'prod-east',
          triggeredBy: ['@atlaskit/fuzz'],
        },
      ],
    },
  ],
);
