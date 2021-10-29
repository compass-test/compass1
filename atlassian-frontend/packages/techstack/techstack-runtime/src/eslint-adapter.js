const flatten = require('lodash/flatten');
const uniq = require('lodash/uniq');

const cache = require('./cache');
const {
  getChecksForPackages,
  getTechstackConfig,
  resolveEslintRule,
  getRelativePath,
  createPathResolver,
} = require('./utils');

const TYPE = 'eslint';
const DEFAULT_FILES_GLOB = '**/*.{js,jsx,ts,tsx}';
const DEFAULT_CONFIGURATION = 'error';
const CACHE_PREFIX_ESLINT_CONFIG = `eslint-config`;

const eslintAdapter = (
  baseEslintConfig,
  { workingDirectory = process.cwd() } = {},
) => {
  const cacheKey = `${CACHE_PREFIX_ESLINT_CONFIG}-${workingDirectory}`;
  let eslintConfig = cache.get(cacheKey);

  if (eslintConfig) {
    return eslintConfig;
  }

  const {
    config: { rootPath, pathToPackages, eslintConfigPath, exclusions },
    repository: repositoryTechstack,
    default: defaultTechstack,
  } = getTechstackConfig({
    rootPath: workingDirectory,
  });

  const resolveFile = createPathResolver(workingDirectory);

  const checksForPackages = getChecksForPackages({
    rootPath: resolveFile(rootPath),
    pathToPackages,
    type: TYPE,
    exclusions,
    repositoryTechstack,
    defaultTechstack,
  });

  const techstackPlugins = flatten(
    checksForPackages.map(({ checks }) => checks.map(check => check.plugin)),
  ).filter(Boolean);

  const techstackOverrides = checksForPackages.map(
    ({ checks, packageRootPath, ignores = [] }) => {
      const packageOverrideConfig = {
        files: [
          `${getRelativePath(
            resolveFile(eslintConfigPath),
            packageRootPath.absolute,
          )}/${DEFAULT_FILES_GLOB}`,
        ],
        rules: {},
      };

      const packageOverrides = checks.reduce((overrideConfig, check) => {
        const { resolverPlugin, rule, configuration } = check;
        if (ignores.includes(rule)) return overrideConfig;

        let resolvedConfiguration = configuration;
        if (overrideConfig.rules[rule]) {
          resolvedConfiguration = resolveEslintRule({
            resolverPlugin,
            existingRuleConfig: overrideConfig.rules[rule],
            newRuleConfig: configuration,
            rule,
          });
        } else if (baseEslintConfig.rules && baseEslintConfig.rules[rule]) {
          resolvedConfiguration = resolveEslintRule({
            resolverPlugin,
            existingRuleConfig: baseEslintConfig.rules[rule],
            newRuleConfig: configuration,
            rule,
          });
        }

        return {
          ...overrideConfig,
          rules: {
            ...overrideConfig.rules,
            [rule]: resolvedConfiguration || DEFAULT_CONFIGURATION,
          },
        };
      }, packageOverrideConfig);

      return packageOverrides;
    },
  );

  eslintConfig = {
    ...baseEslintConfig,
    overrides: [...(baseEslintConfig.overrides || []), ...techstackOverrides],
    plugins: uniq([...(baseEslintConfig.plugins || []), ...techstackPlugins]),
  };

  cache.set(cacheKey, eslintConfig);

  return eslintConfig;
};

module.exports = eslintAdapter;
