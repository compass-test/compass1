import { PackageJsonValidators } from '../types';
import { exportExclusions } from '../../../common/exclusion-lists';

// These packages have a custom build and no es2019 export
const nonEs2019TsPackages = [
  '@atlaskit/icon-priority',
  '@atlaskit/icon-object',
  '@atlaskit/icon-file-type',
  '@atlaskit/icon',
];

const sharedValidators: PackageJsonValidators = [
  function releaseModel({ config: { atlassian } }) {
    const releaseModels = ['scheduled', 'continuous'];
    if (
      !atlassian?.releaseModel ||
      !releaseModels.includes(atlassian.releaseModel)
    ) {
      return `Missing or invalid atlassian.releaseModel field, must be one of ${releaseModels}`;
    }
    return undefined;
  },
  function atlaskitSrcField({ config }) {
    const mainFieldIsDist = config.main && config.main.startsWith('dist');
    if (mainFieldIsDist && !config['atlaskit:src']) {
      return 'Missing "atlaskit:src" field. This is required for packages that have a main field resolving to "dist" for linting purposes.';
    }
    return undefined;
  },
  function moduleFields({ name, config }) {
    const isPublic = !config.private;
    const isTs =
      config['atlaskit:src'] && config['atlaskit:src'].includes('.ts');
    const hasModuleField = config.module;
    const hasModuleES2019 = config['module:es2019'];
    const isException = nonEs2019TsPackages.includes(name);
    if (
      isPublic &&
      isTs &&
      hasModuleField &&
      !isException &&
      !hasModuleES2019
    ) {
      return 'All typescript packages that include module fields must include module:es2019 fields as well';
    }
    return undefined;
  },
  function babelRuntimeDependency({ config }) {
    // Use types as a heuristic for TS packages
    // We cannot use getPackagesInfo from @atlaskit/build-utils/tools because it is async
    const typesField = config['types'] && config['types'].includes('dist/');
    if (
      typesField &&
      !(config.dependencies && config.dependencies['@babel/runtime'])
    ) {
      return 'Missing @babel/runtime in dependencies. All built typescript packages must list @babel/runtime as a dependency';
    }

    return undefined;
  },
  function afExports({ name, config }) {
    const afExportsField = config['af:exports'];

    const usingDeprecatedAutoEntryPoints =
      config.atlassian?.deprecatedAutoEntryPoints;

    if (!afExportsField && !usingDeprecatedAutoEntryPoints) {
      return 'Missing af:exports field. See https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/build/03-entry-points/';
    }
    if (afExportsField && usingDeprecatedAutoEntryPoints) {
      return 'Cannot set both af:exports and atlassian.deprecatedAutoEntryPoints fields. Please remove deprecatedAutoEntryPoints by following the entry points migration docs before declaring af:exports';
    }
    const isExcluded = exportExclusions.has(name);
    if (usingDeprecatedAutoEntryPoints && !isExcluded) {
      return 'New packages cannot set atlassian.deprecatedAutoEntryPoints field. Entry points must be declared using af:exports instead. Set to {} if you are not exposing any custom entry points';
    }
    if (afExportsField && isExcluded) {
      return `Please remove your package from the entry points exclusion list to complete migration at '${__dirname}/exclusion-lists.ts'`;
    }
    if (
      afExportsField &&
      Object.keys(afExportsField).length === 0 &&
      config.main
    ) {
      return `Must declare at least one entry point in af:exports field when package has a main field`;
    }

    return undefined;
  },
  function prettierConfig({ config: { name, devDependencies, prettier } }) {
    const prettierConfigAliasRegex = new RegExp(
      '@atlassian/atlassian-frontend-prettier-config-([0-9]+(.?)){3}',
    );
    const prettierConfigDependencyRegex = new RegExp(
      `npm:@atlassian/atlassian-frontend-prettier-config@([0-9]+(.?)){3}`,
    );

    if (name === '@atlassian/atlassian-frontend-prettier-config') {
      return undefined;
    }

    if (
      !prettier ||
      typeof prettier !== 'string' ||
      !prettier.match(prettierConfigAliasRegex)
    ) {
      return `Must declare a prettier config to use the aliased atlassian-frontend config, "prettier": "@atlassian/atlassian-frontend-prettier-config-x.x.x"`;
    }

    if (
      !Object.entries(devDependencies || {}).some(
        ([key, value]) =>
          key.match(prettierConfigAliasRegex) &&
          value.match(prettierConfigDependencyRegex),
      )
    ) {
      return `Must have a alias dependency for prettier-config as "@atlassian/atlassian-frontend-prettier-config-x.x.x": "@atlassian/atlassian-frontend-prettier-config-x.x.x"`;
    }

    return undefined;
  },
];

export default sharedValidators;
