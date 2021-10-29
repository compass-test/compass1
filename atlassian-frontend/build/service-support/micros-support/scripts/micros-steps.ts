import chalk from 'chalk';
import spawndamnit from 'spawndamnit';
import { SpawnOptions } from 'child_process';

export const execMicrosCli = (
  args: string[],
  options: SpawnOptions,
  isCi: boolean,
  dryRun: boolean,
) => {
  const command = 'atlas';
  args.unshift('micros');

  console.log(
    chalk.green(
      `Running micros command: ${chalk.bold(command)} ${chalk.bold(
        args.join(' '),
      )}`,
    ),
  );
  if (
    options &&
    typeof options.env === 'object' &&
    typeof options.env.ARTEFACT === 'string'
  ) {
    console.log(
      chalk.green(`Artefact location: ${chalk.bold(options.env.ARTEFACT)}`),
    );
  } else {
    throw new Error('Artefact location is not defined');
  }

  if (dryRun) {
    return Promise.resolve();
  }

  return spawndamnit(command, args, options);
};

export enum MicrosEnv {
  pdev = 'pdev',
  'pdev-apse2' = 'pdev-apse2',
  ddev = 'ddev',
  'dev-west2' = 'dev-west2',
  adev = 'adev',
  'adev-west2' = 'adev-west2',
  'stg-east' = 'stg-east',
  'stg-west' = 'stg-west',
  'stg-west2' = 'stg-west2',
  'stg-euwest' = 'stg-euwest',
  'stg-eucentral' = 'stg-eucentral',
  'stg-apse' = 'stg-apse',
  'stg-apse2' = 'stg-apse2',
  'prod-east' = 'prod-east',
  'prod-west' = 'prod-west',
  'prod-west2' = 'prod-west2',
  'prod-euwest' = 'prod-euwest',
  'prod-eucentral' = 'prod-eucentral',
  'prod-apse' = 'prod-apse',
  'prod-apse2' = 'prod-apse2',
  all = 'all',
}

export type MicrosEnvStrings = keyof typeof MicrosEnv;

export const getArtefactLocation = (
  serviceName: string,
  releaseVersion: string,
  isSox: boolean,
) => {
  return `${isSox ? '_sox/' : ''}${serviceName}/${releaseVersion}.zip`;
};

const getEnvVariables = (artefact: string, releaseVersion: string) => {
  return {
    ...process.env,
    ARTEFACT: artefact,
    VERSION: releaseVersion,
  };
};

export const uploadLambdaZip = (
  cwd: string,
  zipLocation: string,
  serviceName: string,
  env: MicrosEnvStrings,
  isCi: boolean,
  artefact: string,
  isSox: boolean,
  dryRun: boolean,
  releaseVersion: string,
) => {
  console.log(chalk.yellow('Uploading bundle...'));

  const commandArgs = [
    'resource',
    'lambda',
    'upload',
    `--service=${serviceName}`,
    `--file=${zipLocation}`,
    `--env=${env}`,
  ];

  if (isSox) {
    commandArgs.push('--prgb');
  }

  return execMicrosCli(
    commandArgs,
    {
      cwd,
      stdio: 'inherit',
      env: getEnvVariables(artefact, releaseVersion),
    },
    isCi,
    dryRun,
  );
};

export const microsResourceSet = (
  cwd: string,
  artefact: string,
  serviceName: string,
  fileName: string,
  env: MicrosEnvStrings,
  isCi: boolean,
  isSox: boolean,
  dryRun: boolean,
  releaseVersion: string,
) => {
  console.log(chalk.yellow('Setting resource...'));

  const commandArgs = [
    'resource',
    'set',
    `--service=${serviceName}`,
    `--env=${env}`,
    `--file=${fileName}`,
  ];

  if (isSox) {
    commandArgs.push('--prgb');
  }

  return execMicrosCli(
    commandArgs,
    {
      cwd,
      stdio: 'inherit',
      env: getEnvVariables(artefact, releaseVersion),
    },
    isCi,
    dryRun,
  );
};

export const microsDeploy = (
  cwd: string,
  artefact: string,
  serviceName: string,
  fileName: string,
  env: MicrosEnvStrings,
  isCi: boolean,
  dryRun: boolean,
  releaseVersion: string,
) => {
  console.log(chalk.yellow('Deploying resource...'));

  const commandArgs = [
    'service',
    'deploy',
    `--service=${serviceName}`,
    `--env=${env}`,
    `--file=${fileName}`,
  ];

  return execMicrosCli(
    commandArgs,
    {
      cwd,
      stdio: 'inherit',
      env: getEnvVariables(artefact, releaseVersion),
    },
    isCi,
    dryRun,
  );
};
