import { AFPackage } from '@atlaskit/build-utils/types';
import { customPublishConfigExclusions } from '../../../common/exclusion-lists';
import { internalScopes, unpublishedScopes } from './internal';
import { PackageJsonValidators } from '../types';

function isInternalDependency(dependency: string) {
  const unallowedScopes = [...internalScopes, ...unpublishedScopes];

  return unallowedScopes.some(scope => dependency.startsWith(scope));
}

function isPrivateAtlaskitPackage(dependency: string, workspaces: AFPackage[]) {
  if (dependency.startsWith('@atlaskit/')) {
    const foundPkg = workspaces.find(p => p.name === dependency);
    if (foundPkg && foundPkg.config.private) {
      return true;
    }
  }
  return false;
}

const publicValidators: PackageJsonValidators = [
  // Check if scope matches registry
  function correctRegistry(pkg) {
    const {
      config: { publishConfig },
      name,
    } = pkg;
    const publicRegistry =
      publishConfig &&
      publishConfig.registry &&
      publishConfig.registry.includes('registry.npmjs.org');

    if (customPublishConfigExclusions.has(name)) {
      return undefined;
    }

    if (!pkg.config.private && !publicRegistry) {
      return 'Public packages need to be published to the npm registry (https://registry.npmjs.org/)';
    }
    if (pkg.config.private && publishConfig) {
      return 'Private packages do not need to have publishConfig defined';
    }
    return undefined;
  },
  function websiteName({ config: { atlassian } }) {
    if (atlassian && atlassian.website && !atlassian.website.name) {
      return 'If supplying atlassian website metadata, must define atlassian.website.name';
    }
    return undefined;
  },
  // Public Atlaskit packages can't depend on internal packages
  function illegalDeps(pkg, workspaces) {
    if (pkg.config.private) {
      return undefined;
    }
    const deps = Object.keys(pkg.config.dependencies || {});
    const illegalDeps = [];
    for (const dep of deps) {
      if (isInternalDependency(dep)) {
        illegalDeps.push(dep);
      }
      if (isPrivateAtlaskitPackage(dep, workspaces)) {
        illegalDeps.push(dep);
      }
    }
    return illegalDeps.length > 0
      ? `This public package can not depend on private packages: ${illegalDeps.join(
          ', ',
        )}`
      : undefined;
  },
];

export const publicScopes = ['@atlaskit'];

export default publicValidators;
