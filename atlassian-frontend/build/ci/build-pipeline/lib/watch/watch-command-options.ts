/**
 * Watch related functions & utils
 */
import chalk from 'chalk';

import { prefixConsoleLog } from '@atlaskit/build-utils/logging';
import { Options as RunOptions } from '@atlaskit/build-utils/runCommands';
import { PackageInfo } from '@atlaskit/build-utils/tools';
import * as yalc from '@atlassian/yalc-fork';

import { DistType } from '../types';

export function getWatchCommandOptions(
  pkg: PackageInfo,
  distType: DistType[] | undefined,
  log: (...msg: any) => void,
) {
  if (pkg.runBabel) {
    return getJSWatchOptions(pkg, distType, log);
  } else if (pkg.runTypeScriptBuild) {
    return getTSWatchOptions(pkg, distType, log);
  }
  return {};
}

function getJSWatchOptions(
  pkg: PackageInfo,
  distType: DistType[] | undefined,
  log: (...msg: any) => void,
) {
  return buildWatchCommandOptions(
    { distType, pkg: pkg, log },
    /Successfully compiled/,
  );
}

function getTSWatchOptions(
  pkg: PackageInfo,
  distType: DistType[] | undefined,
  log: (...msg: any) => void,
) {
  const buildTypes = !distType || distType.includes('types');
  if (buildTypes) {
    return buildWatchCommandOptions(
      // We only build types once, so only one success required
      { distType, pkg: pkg, successesRequired: 1, log },
      /Watching for file changes./,
    );
  } else {
    return buildWatchCommandOptions(
      {
        distType,
        pkg: pkg,
        log,
      },
      /Successfully compiled/,
    );
  }
}

/* Returns watch specific options to the runCommands module that allows us to execute steps after
 * a successful recompile.
 * The steps executed are:
 *   - Publish package to yalc and push to linked repos
 */
function buildWatchCommandOptions(
  buildOptions: {
    distType: DistType[] | undefined;
    pkg: PackageInfo;
    successesRequired?: number;
    log: (...msg: any) => void;
  },
  successRegex: RegExp,
  firstSuccessRegex?: RegExp,
) {
  const { distType, pkg, log } = buildOptions;
  const options: Pick<
    RunOptions,
    'watchSuccessCondition' | 'onWatchSuccess' | 'watchFirstSuccessCondition'
  > = {
    watchSuccessCondition: generateWatchSuccessCondition(
      successRegex,
      distType,
      { successesRequired: buildOptions.successesRequired },
    ),
    onWatchSuccess: async () => {
      const restoreConsoleLog = prefixConsoleLog(chalk.blue('Yalc:'));
      // Publish package to yalc with push mode to automatically update the package in linked repos
      await yalc.publishPackage({
        workingDir: pkg.dir,
        changed: true,
        push: true,
      });
      restoreConsoleLog();
      log('Recompiled and pushed changes...');
    },
  };

  if (firstSuccessRegex) {
    options.watchFirstSuccessCondition = generateWatchSuccessCondition(
      firstSuccessRegex,
      distType,
    );
  }

  return options;
}

/**
 * We pattern match watch command output to detect when a recompile has successfully finished.
 * However, since we execute two watch commands if building both types of dists, we have to ensure
 * that we only emit success when both watch commands have finished rather than only one.
 */
function generateWatchSuccessCondition(
  regex: RegExp,
  distType: DistType[] | undefined,
  opts: { successesRequired?: number } = {},
) {
  let successesRequired = distType ? distType.length : 2;
  if (opts.successesRequired) {
    successesRequired = opts.successesRequired;
  }
  let successCount = 0;
  return (output: string) => {
    successCount += regex.test(output) ? 1 : 0;
    if (successCount === successesRequired) {
      successCount = 0;
      return true;
    }
    return false;
  };
}
