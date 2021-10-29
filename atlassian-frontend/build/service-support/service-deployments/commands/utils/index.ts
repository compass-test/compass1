import * as bolt from 'bolt';
import chalk from 'chalk';
import { AFPackageJson } from '@atlaskit/build-utils/types';
import { validateEnvVars } from '@atlaskit/build-utils/guards';

export const Logger = {
  log: console.log,
  progress: (message: string) => console.log(chalk.yellow(message)),
  success: (message: string) => console.log(chalk.green.bold(message)),
  exit: (message: any, code = 1) => {
    const toLog = message.response ? message.response.data : message;
    console.log(typeof toLog === 'string' ? chalk.red(toLog) : toLog);
    process.exit(code);
  },
};

type EnvVariables = {
  [key: string]: string | undefined;
};

type PipelineVariables = {
  BITBUCKET_COMMIT: string;
  BITBUCKET_BRANCH: string;
  PIPELINES_JWT_TOKEN: string;
  BITBUCKET_USER: string;
  BITBUCKET_PASSWORD: string;
  BITBUCKET_REPO_FULL_NAME: string;
  BITBUCKET_BUILD_NUMBER: string;
  AFP_SLACK_TOKEN: string;
  SERVICE_DASHBOARD_URL: string;
};

type DeploymentPipelineVariables = PipelineVariables & {
  SERVICE_PACKAGE: string;
  SERVICE_NAME: string;
  MICROS_ENV: string;
};

type RollbackPipelineVariables = DeploymentPipelineVariables & {
  VERSION: string;
};

type DeploymentAfterScriptPipelineVariables = Omit<
  DeploymentPipelineVariables,
  'SERVICE_NAME'
>;

const pipelineVariables = [
  'BITBUCKET_COMMIT',
  'BITBUCKET_BRANCH',
  'PIPELINES_JWT_TOKEN',
  'BITBUCKET_USER',
  'BITBUCKET_PASSWORD',
  'BITBUCKET_REPO_FULL_NAME',
  'BITBUCKET_BUILD_NUMBER',
  'AFP_SLACK_TOKEN',
  'SERVICE_DASHBOARD_URL',
];

const deploymentPipelineVariables = pipelineVariables.concat([
  'SERVICE_PACKAGE',
  'SERVICE_NAME',
  'MICROS_ENV',
]);

const rollbackPipelineVariables = deploymentPipelineVariables.concat([
  'VERSION',
]);

export function validatePipelineVariables(
  env: Partial<PipelineVariables>,
): asserts env is EnvVariables & PipelineVariables {
  validateEnvVars<PipelineVariables>(env, pipelineVariables);
}

export function validateDeploymentPipelineVariables(
  env: Partial<DeploymentPipelineVariables>,
): asserts env is DeploymentPipelineVariables {
  validateEnvVars<DeploymentPipelineVariables>(
    env,
    deploymentPipelineVariables,
  );
}

export function validateRollbackPipelineVariables(
  env: Partial<RollbackPipelineVariables>,
): asserts env is RollbackPipelineVariables {
  validateEnvVars<RollbackPipelineVariables>(env, rollbackPipelineVariables);
}

export function validateDeploymentAfterScriptPipelinesVariables(
  env: Partial<DeploymentAfterScriptPipelineVariables>,
): asserts env is EnvVariables & DeploymentAfterScriptPipelineVariables {
  validateEnvVars<DeploymentAfterScriptPipelineVariables>(
    env,
    deploymentPipelineVariables.filter(v => v !== 'SERVICE_NAME'),
  );
}

export async function getPackage(packageName: string) {
  const pkgs = await bolt.getWorkspaces<AFPackageJson>({
    only: packageName,
  });
  if (pkgs.length !== 1) {
    Logger.exit(`The package ${packageName} does not exist`);
  }
  return pkgs[0];
}

export function getFlag(name: string) {
  return process.argv.includes(name);
}
