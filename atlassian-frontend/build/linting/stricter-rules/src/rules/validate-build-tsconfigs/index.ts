/**
 * Adds validation to each published TypeScript package (packages without 'private: true' in package.json)
 *  - Enforces tsconfig.json in each package to extend the root tsconfig (../../tsconfig.json)
 *  - Enforces each TypeScript package to have build/tsconfig.json
 *  - build/tsconfig.json in each package must have paths: {}
 *  - build/tsconfig.json must extend ../tsconfig.json
 *  - Certain packages must have a src folder
 *  - Certain packages don't need a build/tsconfig.json
 */
import JSON5 from 'json5';
import path from 'path';

import { AFPackageJson } from '@atlaskit/build-utils/types';
import fs from 'fs';

import { RuleDefinition } from '../../types';
import {
  getFromCache,
  TSCONFIG_PREFIX,
  BUILD_TSCONFIG_PREFIX,
} from '../../common/cache';

const WRONG_PKG_EXTEND = 'wrong-extend';
const WRONG_BUILD_EXTEND = 'wrong-build-extend';
const MISSING_BUILD = 'missing-build';
const MISSING_PATHS = 'missing-paths';
const MISSING_SRC = 'missing-src';
const ILLEGAL_BUILD = 'illegal-build';
const INCLUDES_TESTS = 'includes-tests';
const errorTypes = {
  WRONG_PKG_EXTEND,
  WRONG_BUILD_EXTEND,
  MISSING_BUILD,
  MISSING_PATHS,
  MISSING_SRC,
  ILLEGAL_BUILD,
  INCLUDES_TESTS,
} as const;

type ErrorTypes = typeof errorTypes;

type ErrorType = typeof errorTypes[keyof ErrorTypes];

type Error = {
  errorType: ErrorType;
  packageName: string;
  packagePath: string;
};

const testGlobs = [
  '../src/**/__tests__/*',
  '../src/**/*.test.*',
  '../src/**/test.*',
];

const fixIncludesTests = (packagePath: string) => {
  const tsConfigPath = path.join(packagePath, 'build', 'tsconfig.json');
  const tsConfig: { [key: string]: string } = JSON5.parse(
    fs.readFileSync(tsConfigPath, 'utf-8'),
  );

  const exclude = tsConfig.exclude
    ? [
        ...tsConfig.exclude,
        ...testGlobs.filter(item => !tsConfig.exclude.includes(item)),
      ]
    : testGlobs;

  fs.writeFileSync(
    tsConfigPath,
    JSON.stringify(
      {
        ...tsConfig,
        exclude,
      },
      null,
      2,
    ),
  );
};

const defaultErrorTransformer = (errors: Error[]) =>
  errors.map(({ errorType, packageName, packagePath }) => {
    switch (errorType) {
      case WRONG_PKG_EXTEND:
        return `${packagePath}/tsconfig.json must extend the root tsconfig`;
      case WRONG_BUILD_EXTEND:
        return `${packagePath}/build/tsconfig.json must extend '../tsconfig.json'`;
      case MISSING_BUILD:
        return `${packageName} must have a build/tsconfig.json`;
      case MISSING_PATHS:
        return `${packagePath}/build/tsconfig.json must have 'paths: {}'`;
      case MISSING_SRC:
        return `${packageName} must have a src directory`;
      case ILLEGAL_BUILD:
        return `${packageName} - build/tsconfig.json should only exist for packages that declare a main field pointing to "dist/" or a bin field`;
      case INCLUDES_TESTS:
        return {
          message: `${packageName} - build/tsconfig.json must exclude tests`,
          fix: () => {
            fixIncludesTests(packagePath);
          },
        };
      default:
        throw new Error(`Unknown error type ${errorType}.`);
    }
  });

function shouldHaveBuildTsconfig(pkgJson: AFPackageJson) {
  const hasDistMainField = pkgJson.main && pkgJson.main.includes('dist/');
  const hasBinField = pkgJson.bin;
  const hasCustomEntryPoints =
    pkgJson['af:exports'] && Object.keys(pkgJson['af:exports']).length > 0;

  return (
    !pkgJson.private &&
    (hasDistMainField || hasBinField || hasCustomEntryPoints)
  );
}

const ruleDefinition: RuleDefinition<ErrorTypes> = {
  onProject: ({
    files,
    rootPath,
    config,
    errorTransformer = defaultErrorTransformer,
  }) => {
    const { workspaces, disableCache } = config;

    const parser = (file: string) =>
      files[file]?.source && JSON5.parse(files[file].source || '{}');

    const errors: Error[] = [];

    workspaces.forEach(pkg => {
      const pkgDir = pkg.dir;

      const pkgTsConfig = getFromCache(
        TSCONFIG_PREFIX,
        `${pkgDir}/tsconfig.json`,
        parser,
        { disableCache },
      );

      const buildTsConfig = getFromCache(
        BUILD_TSCONFIG_PREFIX,
        `${pkgDir}/build/tsconfig.json`,
        parser,
        { disableCache },
      );

      const isTypescriptPkg = !!pkgTsConfig;
      if (!isTypescriptPkg) {
        return;
      }

      const packagePath = path.relative(rootPath, pkgDir);

      const isBuildTsconfigOptional = !!pkg.config.private;

      const addError = (errorType: ErrorType) => {
        errors.push({
          errorType,
          packageName: pkg.name,
          packagePath,
        });
      };

      if (
        pkgTsConfig.extends !== '../../../tsconfig.json' &&
        pkgTsConfig.extends !== '../../../tsconfig.node.json'
      ) {
        addError(WRONG_PKG_EXTEND);
      }

      if (buildTsConfig) {
        if (!shouldHaveBuildTsconfig(pkg.config) && !isBuildTsconfigOptional) {
          addError(ILLEGAL_BUILD);
        }
        if (shouldHaveBuildTsconfig(pkg.config) || isBuildTsconfigOptional) {
          if (
            !buildTsConfig.extends ||
            (buildTsConfig.extends !== '../tsconfig' &&
              buildTsConfig.extends !== '../tsconfig.json')
          ) {
            addError(WRONG_BUILD_EXTEND);
          }
          if (
            !buildTsConfig.compilerOptions ||
            !buildTsConfig.compilerOptions.paths ||
            Object.keys(buildTsConfig.compilerOptions.paths).length !== 0
          ) {
            addError(MISSING_PATHS);
          }

          if (
            !buildTsConfig.exclude ||
            !testGlobs.every(testGlob =>
              buildTsConfig.exclude.includes(testGlob),
            )
          ) {
            addError(INCLUDES_TESTS);
          }

          const hasSrcFile = !!Object.keys(files).find(file =>
            file.includes(`${pkgDir}/src/`),
          );

          if (!hasSrcFile) {
            addError(MISSING_SRC);
          }
        }
      } else {
        if (shouldHaveBuildTsconfig(pkg.config)) {
          addError(MISSING_BUILD);
        }
      }
    });

    return errorTransformer(errors);
  },
  errorTypes,
};

export default ruleDefinition;
