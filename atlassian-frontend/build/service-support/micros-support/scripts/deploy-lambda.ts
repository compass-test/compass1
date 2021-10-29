#!/usr/bin/env node
import * as bolt from 'bolt';
import meow from 'meow';
import chalk from 'chalk';
import { AFPackageJson } from '@atlaskit/build-utils/types';
import { deploy } from './lambda-steps';
import { MicrosEnv, MicrosEnvStrings } from './micros-steps';

const exit = (errors: string[]) => {
  console.log(chalk.red(errors.join('\n')));
  process.exit(1);
};

export default async function deployLambda() {
  const cli = meow(
    chalk`
    Deploys a lambda to micros
    @atlassian/micros-support is a required dependency of the service

    {bold USAGE}
      $ npx @atlassian/micros-support deploy-lambda [options]

    {bold OPTIONS}
      {yellow --package, -p}      Name of the service package (e.g. @atlassian/service-name) [default: service in cwd]
      {yellow --env, -e}          Which environment to deploy to [default: ddev]
      {yellow --useResourceSet}   Use resourceset instead of a full deploy (only full deploy the first time)
      {yellow --isCi}             Is running on CI
      {yellow --isSox}            Is deploying to a sox env

    {bold EXAMPLES}
      $ npx @atlassian/micros-support deploy-lambda -e ddev --useResourceSet
      $ npx @atlassian/micros-support deploy-lambda --package @af/af-product-integration --isCi --env prod-west --isSox
    `,
    {
      flags: {
        package: {
          type: 'string',
          alias: 'p',
        },
        env: {
          type: 'string',
          alias: 'e',
          default: MicrosEnv.ddev,
        },
        file: {
          type: 'string',
          alias: 'f',
        },
        useResourceSet: {
          type: 'boolean',
          default: false,
        },
        isCi: {
          type: 'boolean',
          default: false,
        },
        isSox: {
          type: 'boolean',
          default: false,
        },
        dryRun: {
          type: 'boolean',
          default: false,
        },
      },
    },
  );

  const options = { ...cli.flags } as {
    package?: string;
    env: MicrosEnvStrings;
    file?: string;
    useResourceSet: boolean;
    isCi: boolean;
    isSox: boolean;
    dryRun: boolean;
  };

  const errors = [];
  let targetPath = process.cwd();
  let pkgConfig;
  let fileName = options.file;

  if (options.package) {
    const workspaces = await bolt.getWorkspaces<AFPackageJson>({
      only: options.package,
    });
    if (workspaces.length !== 1) {
      errors.push(`No package exists with the name ${options.package}`);
    } else {
      const pkg = workspaces[0];
      targetPath = pkg.dir;
      pkgConfig = pkg.config;
    }
  } else {
    targetPath = process.cwd();
    try {
      pkgConfig = require(`${targetPath}/package.json`);
    } catch {
      errors.push(
        "Doesn't look like you're executing this in a package directory, try using the --package flag",
      );
    }
  }

  if (!pkgConfig['af:services']) {
    errors.push(
      "You're not executing in a service directory, either use --package or add af:services in the package.json",
    );
  } else if (!pkgConfig['af:services'].serviceName) {
    errors.push(
      "Please declare af:services.serviceName in your service's package.json",
    );
  }

  if (errors.length > 0) {
    console.log(cli.help);
    exit(errors);
  }

  const serviceName = pkgConfig['af:services'].serviceName;

  if (!fileName) {
    console.log('No --file defined, using <service-name>.sd.yml');
    fileName = `${serviceName}.sd.yml`;
  }

  if (options.isCi) {
    // Set some default environment variables for CI deploys
    const blockServiceName = serviceName.toUpperCase().replace(/-/g, '_');
    const serviceMicrosToken = process.env[`${blockServiceName}_MICROS_TOKEN`];
    const defaultMicrosToken = options.isSox
      ? `sox:${process.env.PIPELINES_JWT_TOKEN}`
      : serviceMicrosToken;
    process.env.MICROS_TOKEN = process.env.MICROS_TOKEN || defaultMicrosToken;
    process.env.MICROS_URL =
      process.env.MICROS_URL || 'wss://micros-proxy.services.atlassian.com';
  }

  await deploy(
    targetPath,
    serviceName,
    fileName,
    options.env,
    options.useResourceSet,
    options.isCi,
    options.isSox,
    options.dryRun,
  );
}

if (require.main === module) {
  deployLambda();
}
