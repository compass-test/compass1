import { PackageJsonValidators } from '../types';

export const internalScopes = ['@atlassian/', '@atlassiansox/'];

export const unpublishedScopes = ['@af/', '@repo/', '@unpublished/'];

const internalValidators: PackageJsonValidators = [
  // Check if scope matches registry
  function correctRegistry(pkg) {
    const {
      config: { publishConfig },
      name,
    } = pkg;
    const internalRegistry =
      publishConfig &&
      publishConfig.registry &&
      publishConfig.registry.includes('packages.atlassian.com');

    if (unpublishedScopes.some(scope => name.startsWith(scope))) {
      return undefined;
    }
    if (!pkg.config.private && !internalRegistry) {
      return 'Internal packages need to be published to the atlassian registry (https://packages.atlassian.com/api/npm/npm-remote)';
    }
    if (pkg.config.private && publishConfig) {
      return 'Private packages do not need to have publishConfig defined';
    }
    return undefined;
  },
  // Internal packages shouldn't have a license
  function noLicense({ config: { license } }) {
    return license
      ? 'A License does not need to be defined for internal packages'
      : undefined;
  },
  // Internal packages shouldn't have atlassian.website declared
  function noWebsite({ config: { atlassian } }) {
    return atlassian && atlassian.website
      ? "Internal packages shouldn't be published to the Atlaskit website, please remove atlassian.website"
      : undefined;
  },
  // Private packages should have `private: true` declared
  function noPublish({ name, config }) {
    return unpublishedScopes.some(scope => name.startsWith(scope)) &&
      !config.private
      ? 'Private packages should have `private: true` declared'
      : undefined;
  },
];

export default internalValidators;
