import path from 'path';
import debugModule from 'debug';
import micromatch from 'micromatch';
import * as git from '../util/git';

const rootPackageJsonPath = 'package.json';

const debug = debugModule('atlaskit:yarn');

export async function getWorkspaceGlobs(ref: string, cwd: string) {
  let file;
  try {
    file = await git.showFile(ref, rootPackageJsonPath, { cwd });
  } catch (e) {
    debug(`${rootPackageJsonPath} does not exist`);
    return new Set([]);
  }

  let rootPackageJsonFile;
  try {
    rootPackageJsonFile = JSON.parse(file);
  } catch (e) {
    console.error(`Error parsing ${file}@${ref}: ${e}`);
    return null;
  }

  const workspaces: string[] | { packages: string[] } | undefined =
    rootPackageJsonFile.workspaces;

  if (!workspaces) {
    return new Set([rootPackageJsonPath]);
  }
  // There are actually two formats for workspaces and they are poorly documented
  const workspacePackages = Array.isArray(workspaces)
    ? workspaces
    : workspaces.packages;

  return new Set([
    rootPackageJsonPath,
    ...workspacePackages.map(glob => path.join(glob, 'package.json')),
  ]);
}

export async function getWorkspacePaths(
  ref: string,
  workspaceGlobs: Set<string>,
  cwd: string,
) {
  if (workspaceGlobs.size === 0) {
    return [];
  }
  const workspacePackageJsons = await git.getFiles(ref, '**/package.json', {
    cwd,
  });

  const matchedWorkspaces = micromatch(workspacePackageJsons, [
    ...workspaceGlobs,
  ]);

  if (matchedWorkspaces.length === 0) {
    throw new Error(
      `Could not find any workspace or package.json under ${cwd}`,
    );
  }

  return matchedWorkspaces;
}
