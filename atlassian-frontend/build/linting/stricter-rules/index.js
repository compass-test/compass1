/**
 * This is a JS entry point that loads all rules exported from src/rules
 */
/* eslint-disable global-require,import/no-dynamic-require */

const path = require('path');
const globby = require('globby');

const {
  getWorkspacesSync,
} = require('@atlaskit/build-utils/getWorkspacesSync');

const project = path.join(__dirname, 'tsconfig.json');

if (!require.extensions['.ts']) {
  // ts-node can only handle being registered once, see https://github.com/TypeStrong/ts-node/issues/409
  require('ts-node').register({ project });
}

// List of rules (rule names are the directory name)
const rules = globby.sync('./src/rules/*', { cwd: __dirname });

// This information is passed into the rules
const workspaces = getWorkspacesSync();
const teams = require(path.resolve(__dirname, '../../../teams.json'));

/**
 * Create mapping of rule ID to rule definition
 *
 * if `src/rules/validate-package/index.ts` exports `{ onProject: ({}) => {} }`
 * then output is {
 *  'validate-package': { onProject: ({ config }) => {} }
 * }
 */
module.exports = {
  rules: Object.fromEntries(
    rules.map(ruleFile => {
      const ruleName = path.basename(ruleFile);
      const { onProject, ...rest } = require(ruleFile).default;
      const rule = {
        // We re-create onProject so that the rules can assume the existence of workspaces and teams
        onProject: ({ config, ...args }) => {
          const newConfig = Object.assign({}, config, {
            workspaces,
            teams,
          });
          return onProject({ config: newConfig, ...args });
        },
        ...rest,
      };
      return [ruleName, rule];
    }),
  ),
};
