/**
 * Conducts two distinct checks on the dependencies defined inside each `package.json`
 *
 * For `dependencies`:
 *  Ensures each is used by production code (inside a `src/` folder)
 *
 * TODO: For `devDependencies`:
 *  Ensures they are not only required for examples (see the `validate-example-dependencies` rule for exceptions)
 */
import keyBy from 'lodash/keyBy';
import { execSync } from 'child_process';

import { AFPackage } from '@atlaskit/build-utils/types';

import { partitionIntoPackages, filterImportsDep } from '../../common/files';
import { RuleDefinition } from '../../types';

const UNUSED_DEP = 'unused-dep';
const errorTypes = {
  UNUSED_DEP,
} as const;

type ErrorTypes = typeof errorTypes;

type ErrorType = typeof errorTypes[keyof ErrorTypes];

type Error = {
  errorType: ErrorType;
  pkg: AFPackage;
  dependency: string;
};

const addToDevDependencies = (packageName: string, dependency: string) => {
  execSync(
    `bolt w ${packageName} remove ${dependency} && bolt w ${packageName} add --dev ${dependency}`,
  );
};

const defaultErrorTransformer = (errors: Error[]) =>
  errors.map(({ errorType, pkg, dependency }) => {
    switch (errorType) {
      case UNUSED_DEP:
        return {
          message: `${pkg.name} has '${dependency}' that is not used in any src files (it should either be moved to devDependencies or removed)`,
          fix: () => {
            addToDevDependencies(pkg.name, dependency);
          },
        };
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
  // codemod-utils need to be installed when consumers run npx @atlaskit/codemod-cli
  /codemod-utils/,
] as const;

const ruleDefinition: RuleDefinition<ErrorTypes> = {
  onProject: ({
    rootPath,
    files,
    dependencies,
    config,
    errorTransformer = defaultErrorTransformer,
  }) => {
    const { workspaces, exclude, disableCache } = config;

    const excludeDeps = new Set(exclude || []);
    const workspaceByName = keyBy(workspaces, 'name');

    const errors: Error[] = [];

    const packages = partitionIntoPackages(
      rootPath,
      workspaces,
      files,
      disableCache,
    );

    packages.forEach(pkg => {
      if (!pkg.srcFiles.length) {
        // If no src files are found then it means the package has been excluded from the check
        return;
      }

      const pkgExclusions = new Set(
        pkg.config.stricter?.['no-unused-dependencies']?.exclude,
      );

      const exclude = (pkgDependency: string) =>
        excludeDeps.has(pkgDependency) ||
        pkgExclusions.has(pkgDependency) ||
        globalExclusions.some(exclusionRegex =>
          exclusionRegex.test(pkgDependency),
        );

      Object.keys(pkg.config.dependencies || {}).forEach(pkgDependency => {
        if (exclude(pkgDependency)) {
          return;
        }

        const srcFilesWithDep = filterImportsDep(
          pkg.srcFiles,
          pkgDependency,
          dependencies,
          workspaceByName,
        );

        if (!srcFilesWithDep.length) {
          errors.push({
            errorType: UNUSED_DEP,
            pkg,
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
