/**
 * Builds an individual package at the current working directory.
 * Provides CLI and JS API
 */
/* eslint-disable no-throw-literal */
import chalk from 'chalk';

import { isDefined } from '@atlaskit/build-utils/guards';
import runCommands, {
  Options as RunOptions,
} from '@atlaskit/build-utils/runCommands';
import {
  getPackageInfoFromCwd,
  PackageInfo,
} from '@atlaskit/build-utils/tools';

import { DistType } from '../types';

import { copyVersionJson } from './copy-version';
import {
  generateEntryPointsForPkg,
  validateGeneratedEntryPointsForPkg,
} from './entry-points';
import { generateAmbientDeclarations } from './generate-ambient-declarations';
import { lintTypeDeclarations } from './lint-type-declarations';
import { validateDists } from './validate-dists';

// Its intentional to set the keys here to mandatory
// We use the Partial<T> helper fn where we want optional keys
export type Options = {
  cwd: string | undefined;
  distType: DistType[] | undefined;
  ignoreTsErrors: boolean | undefined;
  /** Custom logger */
  log: (...msg: any) => void;
};
export type StepArgs = Options & { pkg: PackageInfo } & {
  commandOptions?: RunOptions;
};

function getCommandOptions(pkg: PackageInfo, options: RunOptions) {
  return {
    linePrefix: chalk.blue(pkg.name),
    ...options,
  };
}

function getDistCommands(
  commands: {
    cjs: string;
    esm: string;
    es2019: string;
    types: string;
  },
  distType: DistType[] | undefined,
): string[] {
  if (distType && distType[0] === 'none') {
    return [];
  } else if (!distType) {
    return Object.values(commands).filter(isDefined);
  } else {
    return Object.entries(commands)
      .filter(([type]) => distType.includes(type as DistType))
      .map(([, command]) => command);
  }
}

async function buildJSPackage({
  pkg,
  cwd,
  distType,
  commandOptions,
}: StepArgs) {
  if (!pkg.runBabel) {
    return;
  }

  let allCommandOptions: RunOptions = {
    ...getCommandOptions(pkg, { cwd }),
    ...commandOptions,
  };

  const watchFlag = allCommandOptions.onWatchSuccess ? ' -w --verbose' : '';

  const commands = getDistCommands(
    {
      cjs: `NODE_ENV=production BABEL_ENV=production:cjs babel src -d dist/cjs --root-mode upward${watchFlag}`,
      esm: `NODE_ENV=production BABEL_ENV=production:esm babel src -d dist/esm --root-mode upward${watchFlag}`,
      es2019: 'echo "es2019 builds not supported for babel packages"',
      types: 'echo "No type generation for JS packages"',
    },
    distType,
  );
  return runCommands(commands, allCommandOptions);
}

/**
 * Builds typescript packages.
 *
 * Typescript packages in a monorepo need to be built in a topological order, meaning dependencies need to be built before their dependents. Otherwise
 * any dependency types used are treated as `any`.
 * We are leveraging `bolt workspaces exec`'s default topological execution order to achieve this, however there are some existing issues with this:
 *  - The topological order factors in devDependencies when they are not required for building source -https://github.com/boltpkg/bolt/pull/244
 *  - At least one circular dependency exists between packages in the repo, which makes a pure topological sort impossible
 */
async function buildTSPackage({
  cwd,
  distType,
  pkg,
  ignoreTsErrors,
  commandOptions,
  log,
}: StepArgs) {
  if (!pkg.runTypeScriptBuild) {
    return;
  }

  let allCommandOptions: RunOptions = {
    ...getCommandOptions(pkg, { cwd }),
    ...commandOptions,
  };

  const cleanupDeclarations = await generateAmbientDeclarations({
    cwd,
    packageName: pkg && pkg.name,
    log,
  });

  // Watch mode does not output anything on recompile, so we have to use verbose to signal something has happened
  // https://github.com/babel/babel/issues/7926
  const watchFlag = allCommandOptions.onWatchSuccess ? ' -w --verbose' : '';
  // preserveWatchOutput prevents watch from clearing console output on every change
  const tsWatchFlag = allCommandOptions.onWatchSuccess
    ? ' -w --preserveWatchOutput'
    : '';
  const ignoreErrorsFlag = ignoreTsErrors ? ' || true' : '';

  const commands = getDistCommands(
    {
      cjs: `NODE_ENV=production BABEL_ENV=production:cjs babel src -d dist/cjs -x .ts,.tsx --root-mode upward${watchFlag}`,
      esm: `NODE_ENV=production BABEL_ENV=production:esm babel src -d dist/esm -x .ts,.tsx --root-mode upward${watchFlag}`,
      es2019: `NODE_ENV=production BABEL_ENV=production:es2019 babel src -d dist/es2019 -x .ts,.tsx --root-mode upward${watchFlag}`,
      // Allow ignoring of TS errors when building locally
      types: `NODE_ENV=production tsc --project ./build/tsconfig.json --emitDeclarationOnly --outDir ./dist/types${tsWatchFlag}${ignoreErrorsFlag}`,
    },
    distType,
  );

  await runCommands(commands, allCommandOptions);

  if (cleanupDeclarations) {
    // Cleanup the ambient.d.ts files so they do not get uploaded to npm
    await cleanupDeclarations();
  }
}

async function runPostBuildTasks({ cwd, pkg }: StepArgs) {
  if (pkg.config.scripts && pkg.config.scripts['ak-postbuild']) {
    await runCommands(['yarn ak-postbuild'], getCommandOptions(pkg, { cwd }));
  }
}

export function transpilePackage(opts: StepArgs) {
  if (opts.pkg.runBabel) {
    return buildJSPackage(opts);
  } else if (opts.pkg.runTypeScriptBuild) {
    return buildTSPackage(opts);
  } else {
    opts.log('Not a transpiled package');
  }
}

async function runValidateDists(opts: StepArgs) {
  if (
    !opts.distType ||
    opts.distType.filter(type => type !== 'none' && type !== 'types').length > 0
  ) {
    await validateGeneratedEntryPointsForPkg(opts.pkg, {
      cwd: opts.cwd,
      distType: opts.distType,
      log: opts.log,
    });
  }
  opts.log('Linting type declaration files...');
  await lintTypeDeclarations({ cwd: opts.cwd, pkgDir: opts.pkg.dir });
  const { success, packageDistErrors } = await validateDists(opts);
  if (!success) {
    throw new Error(
      `${
        packageDistErrors.length
      } errors detected in package dists:\n * ${packageDistErrors.join('\n * ')}

      The likely causes are introducing a circular dependency between packages or directly importing from the source of another package via relative path. Remove the circular dependency and/or remove the relative path to resolve the issue.`,
    );
  }
}

function validateArgs(opts: Options) {
  const { distType } = opts;
  if (distType) {
    const invalidDistTypes = distType.filter(
      type => !['esm', 'cjs', 'es2019', 'types', 'none'].includes(type),
    );
    if (invalidDistTypes.length > 0) {
      throw `Invalid dist type(s) "${invalidDistTypes}", must be one of "esm", "cjs", "es2019", "types" or "none"`;
    }
  }
}

export default async function buildPkg(
  opts: Partial<Options> & { indent?: number } = {},
) {
  const pkg: PackageInfo = await getPackageInfoFromCwd(opts.cwd);

  function defaultLog(...msg: any[]) {
    console.log(chalk.green(`build (${pkg.name}):`), ...msg);
  }

  const log = opts.log || defaultLog;

  const options: StepArgs = {
    cwd: opts.cwd,
    distType: opts.distType,
    log,
    ignoreTsErrors: opts.ignoreTsErrors,
    pkg,
  };

  validateArgs(options);

  log(`Building ${pkg.name}...`);
  await generateEntryPointsForPkg(pkg, options);
  await transpilePackage(options);
  await runPostBuildTasks(options);
  await copyVersionJson(pkg);
  await runValidateDists(options);

  log('Success');

  return pkg;
}
