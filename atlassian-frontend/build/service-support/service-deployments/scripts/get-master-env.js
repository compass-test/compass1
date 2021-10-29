/**
 * This scripts uses a SERVICE_PACKAGE env var to find and log the environment that the service is deployed to from master
 * (used to export the MICROS_ENV variable)
 */
const bolt = require('bolt');
const chalk = require('chalk');

const exit = message => {
  console.log(typeof message === 'string' ? chalk.red(message) : message);
  process.exit(1);
};

const pkgName = process.env.SERVICE_PACKAGE;
if (!process.env.CI || !pkgName) {
  exit('This script should only be executed in a service deployment pipeline');
}

(async () => {
  const pkgs = await bolt.getWorkspaces({
    only: pkgName,
  });
  if (pkgs.length !== 1) {
    exit(`The package ${pkgName} does not exist`);
  }

  const pkg = pkgs[0];
  const env =
    pkg.config['af:services'] &&
    pkg.config['af:services'].master &&
    pkg.config['af:services'].master.continuous &&
    pkg.config['af:services'].master.continuous.env;

  if (env) {
    console.log(env);
  } else {
    exit(
      `The package ${pkgName} does not have af:services.master.continuous.env declared`,
    );
  }
})().catch(err => exit(err));
