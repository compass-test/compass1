import fs from 'fs';
import path from 'path';
import Cache from 'node-cache';
import * as bolt from 'bolt';

import { AFPackageJson, RepoPackage } from './types';

export type BuildInfo = {
  rootDir: string;
  rootConfig: bolt.PackageJSON;
  packages: Array<RepoPackage>;
};

const cache = new Cache({ checkperiod: 0, useClones: false });

/**
 * Returns information about the repo including:
 *    rootDir: the root directory of the repo
 *    rootConfig: the root package.json
 *    packages: a list of all packages in the repo
 *                name: name of the package
 *                dir: full path to the package
 *                relativeDir: path from the root
 *                config: the package.json
 */
export async function getBuildInfo({ disableCache } = { disableCache: false }) {
  const cachedBuildInfo = cache.get<BuildInfo>('build-info');
  if (!disableCache && !!cachedBuildInfo) {
    return cachedBuildInfo;
  }

  const project = await bolt.getProject();
  const workspaces = await bolt.getWorkspaces<AFPackageJson>();

  const packages = workspaces.map(ws => ({
    name: ws.name,
    dir: ws.dir,
    relativeDir: path.relative(project.dir, ws.dir),
    config: ws.config,
  }));

  const buildInfo: BuildInfo = {
    rootDir: project.dir,
    rootConfig: project.config,
    packages,
  };

  cache.set('build-info', buildInfo);

  return buildInfo;
}

/**
 * A syncronous method for getting the information about packages in CI.
 * You should only need to call this if you need package info in a
 * non-async environment (i.e jest.config.js), otherwise, use the getBuildInfo() fn
 * instead
 * Assumptions:
 *    Must run after `yarn ci write-build-info` has been called
 */
export function getBuildInfoSync() {
  const buildInfoPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'build-info.json',
  );
  if (!fs.existsSync(buildInfoPath)) {
    throw new Error(
      'build-info.json not found, have your run `yarn ci write-build-info` first?',
    );
  }

  const buildInfoFileStr = fs.readFileSync(buildInfoPath, 'utf-8');

  return JSON.parse(buildInfoFileStr) as BuildInfo;
}
