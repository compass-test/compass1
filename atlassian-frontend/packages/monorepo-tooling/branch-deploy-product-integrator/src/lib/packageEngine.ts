import fs from 'fs';
import path from 'path';
import * as bolt from 'bolt';
import { fixDuplicates } from 'yarn-deduplicate';
import spawn from 'projector-spawn';

export async function getWorkspaceDirs(packageEngine: string, cwd: string) {
  if (packageEngine === 'bolt') {
    const ws = await bolt.getWorkspaces();
    return ws.map(pkg => path.relative(cwd, pkg.dir));
  } else if (packageEngine === 'yarn') {
    console.log('getWorkspaceDirs not implemented for yarn workspaces');
    return [];
  } else {
    throw new Error('Invalid package engine');
  }
}

export async function getWorkspacePkgJsons(packageEngine: string, cwd: string) {
  const workspaceDirs = await getWorkspaceDirs(packageEngine, cwd);

  return workspaceDirs.map(dir => `${dir}/package.json`);
}

export async function deduplicate(
  packageEngine: string,
  useMostCommon = false,
  yarnLockPath = 'yarn.lock',
  includePrerelease = false,
) {
  const yarnLock = fs.readFileSync(yarnLockPath, 'utf8');
  let dedupedYarnLock = fixDuplicates(yarnLock, {
    useMostCommon,
    includePrerelease,
  });
  const eolMatch = yarnLock.match(/(\r?\n)/);
  if (eolMatch && eolMatch[0] === '\r\n') {
    dedupedYarnLock = dedupedYarnLock.replace(/\n/g, '\r\n');
  }
  fs.writeFileSync(yarnLockPath, dedupedYarnLock);
  await spawn(packageEngine);
}
