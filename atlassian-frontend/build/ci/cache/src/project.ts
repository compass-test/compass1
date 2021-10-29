import { promises as fsp } from 'fs';
import path from 'path';

import { getPackageDeps } from '@rushstack/package-deps-hash';
import * as lockfile from '@yarnpkg/lockfile';
import * as bolt from 'bolt';
import micromatch from 'micromatch';

import { Config } from './config';
import { Logger } from './logger';

export type Workspace = bolt.Package;

export type Project = {
  /** Root of the project */
  root: bolt.Package;
  /** Map of workspace name to workspace */
  workspaces: Map<string, Workspace>;
  /** Parsed project yarn.lock file */
  resolvedDependencies: lockfile.VersionMap;
  /** Map of project-root relative filepaths to git hashes. */
  gitHashes: Map<string, string>;
};

async function getGitHashes(
  rootDir: string,
  logger: Logger,
  excludeGlobs: string[],
) {
  const profiler = logger.profile('gitHashes');
  const gitHashes = await getPackageDeps(rootDir);
  profiler.stop(':getPackageDeps');
  for (const filename of gitHashes.keys()) {
    if (micromatch.isMatch(filename, excludeGlobs)) {
      gitHashes.delete(filename);
    }
  }
  profiler.stop();

  return gitHashes;
}

async function parseLockfile(projectDir: string) {
  const yarnLock = await fsp.readFile(
    path.resolve(projectDir, 'yarn.lock'),
    'utf8',
  );
  const result = lockfile.parse(yarnLock);
  if (result.type !== 'success') {
    throw new Error('Invalid lockfile');
  }
  return result.object;
}

export async function getProject(
  config: Config,
  logger: Logger,
  cwd?: string,
  workspaces?: Workspace[],
) {
  const project = await bolt.getProject({ cwd });
  const resolvedDependencies = await parseLockfile(project.dir);
  const workspaceArray = workspaces || (await bolt.getWorkspaces({ cwd }));
  const workspaceMap = new Map(
    workspaceArray.map(ws => [ws.name, ws] as const),
  );
  const gitHashes = await getGitHashes(
    project.dir,
    logger,
    config.excludeGlobs,
  );

  return {
    root: project,
    workspaces: workspaceMap,
    resolvedDependencies,
    gitHashes,
  };
}
