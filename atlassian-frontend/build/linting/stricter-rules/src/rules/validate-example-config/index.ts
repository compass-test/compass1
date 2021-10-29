/**
 * Runs a set of validators over each package's `examples/config.jsonc` file
 * See header comments on each validator for descriptions of what each one does.
 */
import keyBy from 'lodash/keyBy';

import { RuleDefinition } from '../../types';
import { partitionIntoPackages } from '../../common/files';

import { validators } from './validators';

const ruleDefinition: RuleDefinition = {
  onProject: ({ rootPath, files, dependencies, config, errorTransformer }) => {
    const { workspaces, disableCache } = config;

    const errors: any[] = [];

    const workspaceByName = keyBy(workspaces, 'name');

    const packages = partitionIntoPackages(
      rootPath,
      workspaces,
      files,
      disableCache,
    );

    packages.forEach(pkg => {
      validators.forEach(validation => {
        errors.push(
          ...validation({
            pkg,
            files,
            dependencies,
            workspaceByName,
            errorTransformer,
          }),
        );
      });
    });

    return errors;
  },
};

export default ruleDefinition;
