/**
 * A set of simple validators to enforce rules in `package.json` files
 *
 * Four types of validators:
 *  1. Shared   -- All packages must follow these rules
 *  2. Public   -- Only apply to public packages (`@atlaskit`)
 *  3. Internal -- Only apply to internal packages (`@af`, `@atlassian`, `@atlassiansox`)
 *  4. Service  -- Only apply to services (inside the `services/` directory)
 */
import path from 'path';

import { RuleDefinition } from '../../types';

import publicValidators, { publicScopes } from './validators/public';
import internalValidators, {
  internalScopes,
  unpublishedScopes,
} from './validators/internal';
import sharedValidators from './validators/shared';
import serviceValidators from './validators/service';
import { PackageJsonValidators } from './types';

const ruleDefinition: RuleDefinition = {
  onProject: ({ rootPath, config }) => {
    const { workspaces, disabledValidators } = config;

    const errors: string[] = [];

    workspaces.forEach(pkg => {
      const isScope = (scopes: string[]) =>
        scopes.some(scope => pkg.name.startsWith(scope));

      const validators: PackageJsonValidators = [];

      const packagePath = path.relative(rootPath, pkg.dir);

      if (packagePath.startsWith('packages/')) {
        validators.push(...sharedValidators);
        if (isScope(publicScopes)) {
          validators.push(...publicValidators);
        } else if (isScope([...internalScopes, ...unpublishedScopes])) {
          validators.push(...internalValidators);
        }
      } else if (packagePath.startsWith('services/')) {
        validators.push(...serviceValidators);
      }

      validators.forEach(validation => {
        if (
          disabledValidators &&
          disabledValidators.includes(validation.name)
        ) {
          return;
        }
        const result = validation(pkg, workspaces);
        if (result) {
          errors.push(`${packagePath}: ${result}`);
        }
      });
    });

    return errors;
  },
};

export default ruleDefinition;
