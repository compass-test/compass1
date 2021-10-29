import path from 'path';
import isEqual from 'lodash/isEqual';

import { DependencyMap } from '@atlaskit/build-utils/types';

import { RuleDefinition } from '../../types';

type Error = {
  packageName: string;
  packagePath: string;
  property?: string;
};

const defaultErrorTransformer = (errors: Error[]) =>
  errors.map(
    ({ property, packageName, packagePath }) =>
      `Dependencies in '${property}' of package ${packageName} (${packagePath}) are not sorted alphabetically. Please run 'bolt w @atlaskit/codeshifts format-package-jsons' to autofix.`,
  );

const validateOrder = (dependencies?: DependencyMap) => {
  if (!dependencies) {
    return true;
  }
  const keys = Object.keys(dependencies);
  const sortedKeys = [...keys].sort();
  return isEqual(keys, sortedKeys);
};

const ruleDefinition: RuleDefinition = {
  onProject: ({
    rootPath,
    config,
    errorTransformer = defaultErrorTransformer,
  }) => {
    const errors: Error[] = [];

    const { workspaces } = config;

    workspaces.forEach(pkg => {
      const packagePath = path.relative(rootPath, pkg.dir);

      const dependencyFields = [
        'dependencies',
        'devDependencies',
        'peerDependencies',
        'optionalDependencies',
      ] as const;

      dependencyFields.forEach(property => {
        if (!validateOrder(pkg.config[property])) {
          errors.push({
            property,
            packageName: pkg.name,
            packagePath,
          });
        }
      });
    });

    return errorTransformer(errors);
  },
};

export default ruleDefinition;
