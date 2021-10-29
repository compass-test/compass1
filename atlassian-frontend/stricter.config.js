/**
 * Stricter configuration.
 *
 * Usage: yarn lint:stricter
 *
 * Options;
 *  --develop - Only run over packages that merge to develop, i.e. on scheduled releases
 *  --master - Only run over packages that merge to master, i.e. not on scheduled releases
 *
 * Both options use the `releaseModel` field in package.json to determine what packages are on scheduled releases.
 */
const path = require('path');
const globby = require('globby');
const partition = require('lodash/partition');
/* This is an internal package that is symlinked to the root as part of postinstall
 * and therefore is not listed in the root package.json */
// eslint-disable-next-line import/no-extraneous-dependencies
const techstackRuntime = require('@atlassian/techstack-runtime');

const {
  getWorkspacesSync,
} = require('./build/legacy/build-utils/getWorkspacesSync');

const onlyMaster = process.argv.includes('--master');
const onlyDevelop = process.argv.includes('--develop');

const rootFileFilters = globby
  .sync('*', {
    ignore: ['packages', 'services'],
    dot: true,
    cwd: __dirname,
  })
  .map((file) => new RegExp(`^${file.replace('.', '\\.')}`));

const excludeFilter = [
  /\/node_modules\//,
  /\/__fixtures__\//,
  /\/dist\//,
  // Entry point package.jsons
  new RegExp('packages/.+/.+/.+/package\\.json'),
  /yarn-[0-9]+.[0-9]+.[0-9]+.*.js/,
  ...rootFileFilters,
];

const workspacePackages = getWorkspacesSync().filter((pkg) =>
  pkg.dir.includes(path.join(__dirname, 'packages')),
);
const [scheduledPackages, continuousPackages] = partition(
  workspacePackages,
  (pkg) =>
    pkg.config.atlassian && pkg.config.atlassian.releaseModel === 'scheduled',
).map((partionedPackages) => {
  return partionedPackages.map(
    (pkg) =>
      // Convert to stricter-compatible regexes rooted at 'packages'
      new RegExp(`${path.relative(__dirname, pkg.dir)}/`),
  );
});
if (onlyMaster && onlyDevelop) {
  throw Error('Cannot specify both --master && --develop flags');
} else if (onlyMaster || onlyDevelop) {
  const filteredPackages = onlyDevelop ? continuousPackages : scheduledPackages;
  excludeFilter.push(...filteredPackages);
}

module.exports = techstackRuntime.stricterAdapter({
  root: '.',
  plugins: ['@repo/rules'],
  exclude: excludeFilter,
  rules: {
    '@repo/rules/validate-build-tsconfigs': {
      level: 'error',
      include: [/\/tsconfig.json$/, /\/src\//],
      exclude: [/^services\//],
    },
    '@repo/rules/validate-package-jsons': {
      level: 'error',
      config: {
        disabledValidators: [],
      },
    },
    '@repo/rules/validate-package-ownership': {
      level: 'error',
    },
    '@repo/rules/validate-dependencies-order': {
      level: 'error',
    },
    '@repo/rules/no-unused-dependencies': {
      level: 'error',
      config: {
        exclude: ['@babel/runtime', 'tslib', 'pg', 'codemod-utils'],
      },
    },
    '@repo/rules/codemods': {
      level: 'error',
      include: [/^.*\/codemods\//],
    },
    '@repo/rules/get-example-url-usage': {
      level: 'warning',
      include: [/^packages\//],
      exclude: [/\/__tests__\//],
    },
    '@repo/rules/validate-example-config': {
      level: 'warning',
    },
  },
});
