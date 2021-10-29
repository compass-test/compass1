const { sep } = require('path');

const escapeStringRegexp = require('escape-string-regexp');
const flatten = require('lodash/flatten');
const groupBy = require('lodash/groupBy');
const isFunction = require('lodash/isFunction');
const mapValues = require('lodash/mapValues');
const uniq = require('lodash/uniq');

const { getChecksForPackages, getTechstackConfig } = require('./utils');

const TYPE = 'stricter';

const stricterAdapter = config => {
  const {
    config: { rootPath, pathToPackages, exclusions },
    repository: repositoryTechstack,
    default: defaultTechstack,
  } = getTechstackConfig({
    rootPath: process.cwd(),
  });
  const checksForPackages = getChecksForPackages({
    rootPath,
    pathToPackages,
    type: TYPE,
    exclusions,
    repositoryTechstack,
    defaultTechstack,
  });
  const techstackPlugins = flatten(
    checksForPackages.map(({ checks }) => checks.map(check => check.plugin)),
  ).filter(Boolean);

  const techstackRules = mapValues(
    groupBy(
      flatten(
        checksForPackages.map(({ checks, ignores = [], packageRootPath }) =>
          checks
            .filter(check => check && !ignores.includes(check.rule))
            .map(check => {
              const appliedIncludePattern = new RegExp(
                `^${escapeStringRegexp(packageRootPath.relative + sep)}`,
              );
              return {
                ...check,
                configuration: {
                  ...check.configuration,
                  include: [appliedIncludePattern],
                },
              };
            }),
        ),
      ),
      check => check.rule,
    ),
    checksForRule => checksForRule.map(check => check.configuration),
  );
  const existingRules = config.rules || {};
  const aggregatedRules = {};
  uniq([...Object.keys(techstackRules), ...Object.keys(existingRules)]).forEach(
    rule => {
      const existingRule = existingRules[rule];
      const techstackRule = techstackRules[rule];
      if (existingRule && techstackRule) {
        if (isFunction(existingRule)) {
          aggregatedRules[rule] = args =>
            flatten([...techstackRule, ...[existingRule(args)]]);
        } else {
          aggregatedRules[rule] = flatten([
            ...techstackRule,
            ...[existingRule],
          ]);
        }
      } else {
        aggregatedRules[rule] = existingRule || techstackRule;
      }
    },
  );
  return {
    ...config,
    plugins: uniq([...(config.plugins || []), ...techstackPlugins]),
    rules: aggregatedRules,
  };
};
module.exports = stricterAdapter;
