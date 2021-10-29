/**
 * TO BE REMOVED IN FAVOUR OF no-unused-dependencies ONCE VIOLATIONS RESOLVED
 */
import path from 'path';
import pathIsInside from 'path-is-inside';
import keyBy from 'lodash/keyBy';

import { FileToData, RuleDefinition } from '../../types';

const UNUSED_DEP = 'unused-dep';
const errorTypes = {
  UNUSED_DEP,
};

type ErrorTypes = typeof errorTypes;

type ErrorType = typeof errorTypes[keyof ErrorTypes];

type Error = {
  errorType: ErrorType;
  packageName: string;
  dependency: string;
};

const defaultErrorTransformer = (errors: Error[]) =>
  errors.map(({ errorType, packageName, dependency }) => {
    switch (errorType) {
      case UNUSED_DEP:
        return `${packageName} has unused dependency '${dependency}'`;

      default:
        throw new Error(`Unknown error type ${errorType}.`);
    }
  });

const globalExclusions = [
  // @types deps correspond to an import of the actual dep
  /@types\//,
  // eslint & stricter plugins are required dynamically at runtime
  /eslint-plugin-/,
  /eslint-resolver-plugin/,
  /stricter-plugin-/,
] as const;

/**
 * Filters dependencies to src files (non node-modules) inside packagePath
 */
const filterSrcFiles = (files: FileToData, packagePath: string) =>
  Object.entries(files)
    .filter(
      ([fileName]) =>
        !fileName.includes(`${path.sep}node_modules${path.sep}`) &&
        pathIsInside(fileName, packagePath),
    )
    .map(([_, file]) => file);

const ruleDefinition: RuleDefinition<ErrorTypes> = {
  onProject: ({
    files,
    config,
    errorTransformer = defaultErrorTransformer,
  }) => {
    const { workspaces, exclude } = config;

    const excludeDeps = new Set(exclude || []);
    const workspaceByName = keyBy(workspaces, 'name');

    const errors: Error[] = [];

    workspaces.forEach(pkg => {
      const srcFiles = filterSrcFiles(files, pkg.dir);

      if (srcFiles.length === 0) {
        return;
      }

      const pkgExclusions = new Set(
        pkg.config.stricter?.['no-unused-dependencies']?.exclude,
      );

      Object.keys(pkg.config.dependencies || {}).forEach(pkgDependency => {
        if (
          excludeDeps.has(pkgDependency) ||
          pkgExclusions.has(pkgDependency) ||
          globalExclusions.some(exclusionRegex =>
            exclusionRegex.test(pkgDependency),
          )
        ) {
          return;
        }

        const depExists = srcFiles.some(
          ({ dependencies: importedDeps = [] }) => {
            let foundDep = importedDeps.some(importedDep =>
              importedDep.includes(pkgDependency),
            );

            // To handle resolution of @atlaskit etc. to paths
            if (!foundDep && workspaceByName[pkgDependency]) {
              const pkgPath = workspaceByName[pkgDependency].dir;
              foundDep = importedDeps.some(importedDep =>
                importedDep.includes(pkgPath),
              );
            }

            return foundDep;
          },
        );

        if (!depExists) {
          errors.push({
            errorType: UNUSED_DEP,
            packageName: pkg.name,
            dependency: pkgDependency,
          });
        }
      });
    });

    return errorTransformer(errors);
  },
  errorTypes,
};

export default ruleDefinition;
