import { AFPackageJson } from '@atlaskit/build-utils/types';

import * as bolt from 'bolt';
import { RenovateConfig } from './renovate-types';
import path from 'path';
import fse from 'fs-extra';

const THIRD_PARTY_ALLOW_LIST = [
  '@atlassian/atlassian-frontend-prettier-config',
  'react-intl',
  'typescript',
];

const baseConfig: RenovateConfig = {
  $schema: 'https://docs.renovatebot.com/renovate-schema.json',
  extends: ['config:base'],
  prConcurrentLimit: 100,
  prHourlyLimit: 10,
  rangeStrategy: 'bump',
  rebaseWhen: 'behind-base-branch',
  timezone: 'Australia/Sydney',
  // We probably want to add a deduplicate by dependency at some point.
  // But requires more careful thought
  // postUpgradeTasks: {
  //   commands: ['npx yarn-deduplicate yarn.lock'],
  //   fileFilters: ['yarn.lock'],
  //   executionMode: 'branch',
  // },
  packageRules: [
    {
      packageNames: ['typescript'],
      groupName: 'Typescript upgrade',
      reviewers: ['mdejongh'],
      enabled: true,
      allowedVersions: '4.2.4',
    },
    {
      packageNames: [
        'react',
        'react-dom',
        '@testing-library/react-hooks',
        'react-test-renderer',
      ],
      groupName: 'React upgrade',
      reviewers: ['mdejongh'],
      enabled: true,
    },
    {
      packageNames: ['react-intl'],
      groupName: 'React-intl upgrade',
      reviewers: ['mdejongh'],
      enabled: true,
      allowedVersions: '5.18.1',
    },
    {
      matchPackagePatterns: ['^@emotion/.*'],
      groupName: 'Emotion upgrade',
      reviewers: ['mdejongh'],
      enabled: true,
      allowedVersions: '11.0.0',
    },
    {
      // This disables node version upgrades
      matchDepTypes: ['engines', 'resolutions'],
      enabled: false,
      groupName: 'Node engine & resolutions updates',
    },
    {
      groupName: 'nvm',
      matchManagers: ['nvm'],
      enabled: false,
    },
    {
      groupName: 'maven',
      matchManagers: ['maven'],
      enabled: false,
    },
    {
      groupName: 'docker',
      matchManagers: ['dockerfile', 'docker-compose'],
      enabled: false,
    },
  ],
};

export const main = async () => {
  const workspaces = await bolt.getWorkspaces<AFPackageJson>();
  const workspaceDependencies = workspaces.map(ws => ws.name);

  baseConfig.packageRules = baseConfig.packageRules || [];
  baseConfig.packageRules.push({
    enabled: false,
    // Renovate doesn't understand Bolt workspaces very well so tries to upgrade.
    // In-repo dependencies. This disable rule prevents that.
    packageNames: workspaceDependencies,
    groupName: 'Bolt workspaces does not play nice with Renovate',
  });

  const rootPackageJson = await fse.readJson('./package.json');

  /**
   * In products we use a .* disable, but for some reason that is not working in atlassian-frontend.
   * So instead we generate an explicit disable list for the renovate.json
   */
  baseConfig.packageRules.push({
    enabled: false,
    packageNames: Object.keys(rootPackageJson.devDependencies)
      .concat(Object.keys(rootPackageJson.dependencies))
      .filter(
        pkg => !THIRD_PARTY_ALLOW_LIST.some(name => pkg.startsWith(name)),
      ),
    groupName: 'Disable all dependencies not explicitely allow listed',
  });

  const teams = workspaces
    .map(ws => ws.config.atlassian?.team)
    .filter((value, index, self) => self.indexOf(value) === index);

  const PrettierUpgradeByTeam = teams.map((team = 'AFP: Monorepo') => {
    const matchPaths = workspaces
      .filter(ws => ws.config.atlassian?.team === team)
      .map(ws => path.relative('./', ws.dir));

    return {
      matchPackagePatterns: [
        '^@atlassian/atlassian-frontend-prettier-config.*',
      ],
      groupName: `Prettier upgrade: ${team}`,
      commitMessageAction: `${team} Prettier upgrade`,
      postUpgradeTasks: {
        commands: [
          'codebase-evolutions/scripts/install-and-link-utils.sh',
          'node codebase-evolutions/scripts/fixup-renovate-prettier-upgrade.js',
          // We need to update the yarn lock since fixing up the prettier dependencies changes the aliases.
          'yarn --ignore-scripts --ignore-engines',
          `npx prettier --write --no-editorconfig ${matchPaths.join(' ')}`,
        ],
        fileFilters: [
          ...matchPaths.map(path => `${path}/**/{,.[^.],..?}*.{ts,tsx,js}`),
          ...matchPaths.map(path => `${path}/**/package.json`),
          '.changeset/*',
          'package.json',
          'yarn.lock',
        ],
        executionMode: 'branch',
      },
      prPriority: 10,
      additionalBranchPrefix: `no-changeset/prettier-upgrade/`,
      matchPaths,
    };
  });

  baseConfig.packageRules.push({
    matchPackagePatterns: ['^@atlassian/atlassian-frontend-prettier-config.*'],
    groupName: `Disable root level prettier upgrade`,
    prPriority: 50,
    matchPaths: ['./package.json', 'yarn.lock'],
    enabled: false,
  });

  baseConfig.packageRules = baseConfig.packageRules.concat(
    PrettierUpgradeByTeam,
  );

  return fse.writeJson('./renovate.json', baseConfig, { spaces: 2 });
};

main();
