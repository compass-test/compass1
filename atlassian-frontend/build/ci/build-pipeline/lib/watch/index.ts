import chalk from 'chalk';

import buildPkg, { Options, transpilePackage, StepArgs } from '../build';

import { getWatchCommandOptions } from './watch-command-options';

/**
 * Watches a package for changes and rebuilds it.
 * Only runs the transpilation step of the build on changes. All other steps (entry point generation etc) must be executed from the normal build script.
 */
export default async function main(opts: Partial<Options>) {
  function log(...msg: any[]) {
    console.log(chalk.green(`watch (${pkg.name}):`), ...msg);
  }

  // Run an initial build of the package
  const pkg = await buildPkg(opts);

  const options: StepArgs = {
    cwd: opts.cwd,
    distType: opts.distType,
    ignoreTsErrors: opts.ignoreTsErrors,
    pkg,
    log,
  };

  // Run transpilation in watch mode
  await transpilePackage({
    ...options,
    commandOptions: getWatchCommandOptions(options.pkg, options.distType, log),
  });
}
