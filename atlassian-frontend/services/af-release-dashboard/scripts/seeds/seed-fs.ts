import fse from 'fs-extra';
import { promises as fsp, constants as fsConstants } from 'fs';
import path from 'path';

import { PullRequestEntity } from '../../src/db/entities/PullRequest';
import { SEEDS_JSON_DIR, SEEDS_JSON_PATH } from '../constants';
import { safeLowerTrim } from '../../src/server/utils';

export async function writeSeed(
  releaseName: string,
  pullRequests: PullRequestEntity[],
): Promise<void> {
  await fse.mkdirp(SEEDS_JSON_DIR);
  await fsp.writeFile(
    SEEDS_JSON_PATH(safeLowerTrim(releaseName)),
    JSON.stringify({ pullRequests }),
  );
}

export async function seedExist(releaseName: string): Promise<boolean> {
  try {
    await fsp.access(
      SEEDS_JSON_PATH(safeLowerTrim(releaseName)),
      fsConstants.F_OK,
    );
    return true;
  } catch (e) {
    return false;
  }
}

interface ReleaseSeedPath {
  name: string;
  path: string;
}

export async function getSeedPaths(): Promise<ReleaseSeedPath[]> {
  const files = await fsp.readdir(SEEDS_JSON_DIR);

  const paths: ReleaseSeedPath[] = [];
  for (const file of files) {
    const basename = path.basename(file);
    const [releaseName] = basename.split('.');

    paths.push({
      name: safeLowerTrim(releaseName),
      path: path.resolve(SEEDS_JSON_DIR, file),
    });
  }
  return paths;
}
