const fs = require('fs');
const path = require('path');

const globToRegExp = require('glob-to-regexp');
const flatten = require('lodash/flatten');

const cache = require('./cache');

const CACHE_PREFIX_PACKAGE_JSON_FILES = 'package-json-files';
const CACHE_PREFIX_TECHSTACK_DEFINITIONS = 'techstack-definition';
const CACHE_PREFIX_PACKAGE_JSON = `package-json`;
const CACHE_PREFIX_ESLINT_RESOLVER = `eslint-resolver`;
const EXCLUDED_DIRS = ['node_modules', 'build', 'logs', 'dist'];

const traverseDirectory = (dir, exclusions, accumulatedFiles = []) => {
  const elements = fs.readdirSync(dir);
  elements.forEach(elementName => {
    const elementPath = path.join(dir, elementName);
    accumulatedFiles.push(elementPath);
    if (
      fs.statSync(elementPath).isDirectory() &&
      !(exclusions || []).includes(elementName)
    ) {
      traverseDirectory(elementPath, exclusions, accumulatedFiles);
    }
  });
  return accumulatedFiles;
};

const findPackageJsons = ({ absPathToPackages, exclusions = [] }) => {
  const key = `${CACHE_PREFIX_PACKAGE_JSON_FILES}:*`;
  let packageJsonFiles = cache.get(key);
  if (!packageJsonFiles) {
    const allFiles = traverseDirectory(absPathToPackages, [
      ...EXCLUDED_DIRS,
      ...exclusions,
    ]);
    const globRe = globToRegExp(`${absPathToPackages}/**/package.json`, {
      globstar: true,
      extended: true,
    });
    packageJsonFiles = allFiles.filter(absolutePath =>
      globRe.test(absolutePath),
    );
    cache.set(key, packageJsonFiles);
  }
  return packageJsonFiles;
};

const getAllPackagesInProject = ({ rootPath, pathToPackages, exclusions }) => {
  const absPathToPackages = path.resolve(rootPath, pathToPackages);
  const allPackages =
    (pathToPackages && findPackageJsons({ absPathToPackages, exclusions })) ||
    [];
  return allPackages;
};

const getChecksForTeckStack = ({ techstackDefinition, techstack, config }) =>
  flatten(
    techstackDefinition.map(useCase =>
      flatten(
        useCase.solutions.map(solution =>
          techstack[useCase.id] &&
          ((Array.isArray(techstack[useCase.id]) &&
            techstack[useCase.id].includes(solution.id)) ||
            techstack[useCase.id] === solution.id)
            ? solution.checks && solution.checks(config)
            : solution.antiChecks && solution.antiChecks(config),
        ),
      ).filter(Boolean),
    ),
  );

const getTechStackFromPackage = ({ packagePath }) => {
  const key = `${CACHE_PREFIX_PACKAGE_JSON}:${packagePath}`;
  let json = cache.get(key);
  if (!json) {
    json = JSON.parse(fs.readFileSync(packagePath).toString());
    cache.set(key, json);
  }
  return {
    techstack: json.techstack,
    name: json.name,
    content: json,
    techstackIgnore: json.techstackIgnore,
  };
};

const getTechStackDefinition = ({ techstackIdentifier }) => {
  const key = `${CACHE_PREFIX_TECHSTACK_DEFINITIONS}:${techstackIdentifier}`;

  let definition = cache.get(key);

  if (!definition) {
    try {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      definition = require(`${techstackIdentifier}-techstack`);
      cache.set(key, definition);
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        throw new Error(`Could not resolve techstack ${techstackIdentifier}`);
      }
      throw e;
    }
  }
  return definition;
};

const getTechstackConfig = ({ rootPath }) => {
  let techstackrc;
  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    techstackrc = require(path.resolve(rootPath, '.techstackrc.js'));
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      throw new Error(`Could not resolve path to techstack configuration`);
    }
    throw e;
  }
  return techstackrc;
};

const getChecksForPackages = ({
  rootPath,
  pathToPackages,
  type,
  exclusions,
  repositoryTechstack,
  defaultTechstack,
}) => {
  const packagePathes = getAllPackagesInProject({
    rootPath,
    pathToPackages,
    exclusions,
  });

  return flatten(
    packagePathes.map(packagePath => {
      const {
        techstack: packageTechstack = {},
        techstackIgnore,
      } = getTechStackFromPackage({
        packagePath,
      });

      if (packageTechstack === 'off') return [];

      const techstack = Object.keys(repositoryTechstack).reduce(
        (acc, definition) => {
          const useCasesDefault = defaultTechstack[definition] || {};
          const useCasesInPackage = packageTechstack[definition] || {};
          return {
            ...acc,
            [definition]: {
              ...useCasesDefault,
              ...useCasesInPackage,
            },
          };
        },
        {},
      );

      const { dir: absolutePackageRootPath } = path.parse(packagePath);

      const relativePackageRootPath = path.relative(
        path.resolve(rootPath, pathToPackages),
        absolutePackageRootPath,
      );

      const packageRootPath = {
        absolute: absolutePackageRootPath,
        relative: relativePackageRootPath,
      };

      const config = { packageRootPath, pathToPackages };

      return [
        {
          packageRootPath,
          ignores: techstackIgnore && techstackIgnore[type],
          checks: flatten(
            Object.keys(techstack).map(techstackIdentifier => {
              const techstackDefinition = getTechStackDefinition({
                techstackIdentifier,
              });
              const useCases = techstack[techstackIdentifier];

              const checks = getChecksForTeckStack({
                techstackDefinition,
                techstack: useCases,
                config,
              });

              const checksForType = checks.filter(check => check.type === type);

              return checksForType;
            }),
          ),
        },
      ];
    }),
  );
};

const getResolverPlugin = ({ resolverPlugin, rule }) => {
  const key = `${CACHE_PREFIX_ESLINT_RESOLVER}:${resolverPlugin}`;

  let resolvers = cache.get(key);

  if (!resolvers) {
    try {
      const resolverPluginParts = resolverPlugin.split('/');
      const fullResolverPluginName =
        resolverPluginParts.length === 2
          ? `${resolverPluginParts[0]}/eslint-resolver-plugin-${resolverPluginParts[1]}`
          : `eslint-resolver-plugin-${resolverPluginParts[0]}`;

      // eslint-disable-next-line import/no-dynamic-require, global-require
      resolvers = require(`${fullResolverPluginName}`);

      cache.set(key, resolvers);
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        throw new Error(
          `Conflicts detected for rule ${rule}, however resolver plugin ${resolverPlugin} could not be resolved.`,
        );
      }
      throw e;
    }
  }
  return resolvers;
};

const resolveEslintRule = ({
  resolverPlugin,
  existingRuleConfig,
  newRuleConfig,
  rule,
}) => {
  if (!resolverPlugin) {
    throw new Error(
      `Conflicts detected for rule ${rule}, however no resolver plugin has been defined. Please provide a resolver plugin.`,
    );
  }
  const plugin = getResolverPlugin({ resolverPlugin, rule });
  const resolver = plugin.resolvers[rule];
  if (!resolver) {
    throw new Error(
      `Conflict detected for rule ${rule}, however resolver plugin ${resolverPlugin} doesn't provide a resolver for the rule.`,
    );
  } else {
    return resolver(existingRuleConfig, newRuleConfig);
  }
};

const getRelativePath = (from, to) => path.relative(from, to);
/**
 * creates a resolved relative to a given path
 * @param {string} baseDirectory
 * @returns {(path: string) => string} resolver
 */
const createPathResolver = baseDirectory => targetDirectory =>
  targetDirectory.startsWith('/')
    ? targetDirectory
    : path.resolve(baseDirectory, targetDirectory);

module.exports = {
  getTechStackDefinition,
  getChecksForTeckStack,
  getTechStackFromPackage,
  getAllPackagesInProject,
  getChecksForPackages,
  getTechstackConfig,
  resolveEslintRule,
  getRelativePath,
  createPathResolver,
};
