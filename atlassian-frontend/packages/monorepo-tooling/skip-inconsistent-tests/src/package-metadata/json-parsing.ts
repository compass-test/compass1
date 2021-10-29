import { AFPackageJson, TeamsJson } from '@atlaskit/build-utils/types';

import { TEAMS_JSON } from '../constants';
import { fileExists, readFile } from '../io/io';
import { Test } from '../types';

async function readPackageJson(
  packageFilePath: string,
): Promise<AFPackageJson> {
  try {
    return JSON.parse(await readFile(packageFilePath, 'utf8'));
  } catch (err) {
    console.error(err);
    throw new Error(`failed to load package.json: ${packageFilePath}`);
  }
}

/**
 * Get the team name from a package.json
 */
const fetchTeamFromPackageJson = async (packageFilePath: string) => {
  try {
    const teamJson = await readPackageJson(packageFilePath);
    if (teamJson.atlassian) {
      return teamJson.atlassian.team;
    }
  } catch (err) {
    console.error(err);
    throw new Error(`failed to fetch team: ${packageFilePath}`);
  }
};

/**
 * Get the jira project URL from the team.json file for a given team name
 */
const fetchProjectUrlFromTeamsJson = async (teamName: string) => {
  try {
    const projectJson: TeamsJson = JSON.parse(
      await readFile(TEAMS_JSON, 'utf8'),
    );
    const teamMeta = projectJson[teamName];
    if (teamMeta) {
      return teamMeta.project;
    }
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to load teams.json for ${teamName}`);
  }
};

/**
 * Get the jira project key that relates to the owners of a given test
 *
 * e.g. '/packages/editor/editor-core/__tests__/integration/foo.ts' => 'ED'
 */
export const determineJiraProjectForFilePath = async (test: Test) => {
  let packagePath = test.path.substr(0, test.path.indexOf('src'));
  if (packagePath === '' || packagePath === undefined) {
    packagePath = determinePackageNameForFilePath(test.path);
  }

  if (packagePath !== '/') {
    const packageJsonPath = packagePath + 'package.json';
    const teamName = await fetchTeamFromPackageJson(packageJsonPath);
    if (teamName) {
      return fetchProjectUrlFromTeamsJson(teamName);
    }
  } else {
    throw new Error(`Could not find package.json for ${test.path}`);
  }
};

/**
 * Get the unscoped package name that houses a given test
 *
 * e.g. '/packages/editor/editor-core/__tests__/integration/foo.ts' => 'editor-core'
 */
export const determinePackageNameForFilePath = (testPath: string) => {
  let tempPackagePath = testPath.split('/');
  tempPackagePath.pop();
  while (tempPackagePath.length > 0) {
    if (fileExists(tempPackagePath.join('/') + '/package.json')) {
      break;
    }
    tempPackagePath.pop();
  }
  return tempPackagePath.join('/') + '/';
};

/**
 * Get the scoped NPM package name that houses a given test
 *
 * e.g. '/packages/editor/editor-core/__tests__/integration/foo.ts' => '@atlaskit/editor-core'
 */
export async function determinePublishedPackageNameForFilePath(test: Test) {
  let packagePath = test.path.substr(0, test.path.indexOf('src'));
  if (packagePath === '' || packagePath === undefined) {
    packagePath = determinePackageNameForFilePath(test.path);
  }

  if (packagePath !== '/') {
    const packageJsonPath = packagePath + 'package.json';
    const packageJson = await readPackageJson(packageJsonPath);
    return packageJson.name;
  } else {
    throw new Error(`Could not find package.json for ${test.path}`);
  }
}
