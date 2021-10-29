import * as bolt from 'bolt';
import chalk from 'chalk';
import { prompt } from 'enquirer';
import termSize from 'term-size';
import fs from 'fs';
import path from 'path';

// Need to reach out to teams.json in the root
// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import * as teams from '../../../../../teams.json';
import { PackageInformation } from '../types';
import { kebabToPascal, validateSlug } from '../utils';

type PickPackageInformation<T extends keyof PackageInformation> = Pick<
  PackageInformation,
  T
>;

export const promptPackageInformation = async (): Promise<PackageInformation | null> => {
  const { dir: rootDir } = await bolt.getProject();

  // Get all packages for validation later.
  const packages = await bolt
    .getWorkspaces<{ name: string }>()
    .then(pkgs => pkgs.map(p => p.name));

  const { team, type } = await prompt<PickPackageInformation<'team' | 'type'>>([
    // Choose team from list in teams.json.
    {
      name: 'team',
      type: 'autocomplete',
      message: `Which team do you work on? (If you can't find your team here please add it to teams.json first.)`,
      choices: Object.keys(teams).sort(),
      limit: Math.max(termSize().rows - 5, 10),
    },
    // Choose package type.
    {
      name: 'type',
      type: 'select',
      message: 'Is your package public, restricted or private?',
      choices: ['public', 'restricted', 'private'],
    },
  ]);

  // Determine scope.
  let scope = '@af';
  if (type === 'public') {
    scope = '@atlaskit';
  }
  if (type === 'restricted') {
    const { restrictedScope } = await prompt<{ restrictedScope: string }>({
      name: 'restrictedScope',
      type: 'select',
      message: 'Do you want to publish to @atlassian or @atlassiansox?',
      choices: ['@atlassian', '@atlassiansox'],
    });
    scope = restrictedScope;
  }

  // Define package directory.
  const { packageDir } = await prompt<PickPackageInformation<'packageDir'>>({
    type: 'input',
    name: 'packageDir',
    message: 'Name your component',
    required: true,
    initial: 'package-name',
    format: (m: string) =>
      `${chalk.dim(`${scope}/`)}${chalk.underline.cyan(m)}`,
    validate: (value: string) => {
      if (!validateSlug(value)) {
        return 'Package names must start and end with a letter and must only contain lower case letters, hypens and underscores.';
      }
      const proposedPkgName = `${scope}/${value}`;
      if (packages.includes(proposedPkgName)) {
        return `A package named ${proposedPkgName} already exists.`;
      }
      return true;
    },
  });
  // Derive full package name and component name from package directory.
  const packageName = `${scope}/${packageDir}`;
  const componentName = kebabToPascal(packageDir);

  const { teamDir, description } = await prompt<
    PickPackageInformation<'teamDir' | 'description'>
  >([
    // Define the team directory.
    {
      name: 'teamDir',
      type: 'input',
      message: 'What directory do you want to create your package in?',
      required: true,
      initial: 'team-dir',
      format: (m: string) =>
        `${chalk.dim('packages/')}${chalk.underline.cyan(m)}${chalk.dim(
          `/${packageDir}`,
        )}`,
      validate: (value: string) => {
        if (!validateSlug(value)) {
          return 'Directory must start and end with a letter and must only contain lower case letters, hypens and underscores.';
        }
        const proposedPkgPath = `packages/${value}/${packageDir}`;
        if (fs.existsSync(path.join(rootDir, `${proposedPkgPath}`))) {
          return `A package already exists at ${proposedPkgPath}.`;
        }
        return true;
      },
    },
    // Add a description.
    {
      name: 'description',
      type: 'input',
      message: 'Add a description.',
      initial: 'Add a description here.',
    },
  ]);

  // Do a final check.
  const { confirm } = await prompt<{ confirm: boolean }>({
    name: 'confirm',
    type: 'confirm',
    message: `Create a new package called ${chalk.bold.blue(
      packageName,
    )} at ${chalk.bold.blue(`packages/${teamDir}/${packageDir}`)}?`,
    initial: true,
  });

  if (!confirm) {
    return null;
  }

  return {
    packageName,
    componentName,
    teamDir,
    packageDir,
    team,
    description,
    testID: packageDir,
    type,
  };
};
