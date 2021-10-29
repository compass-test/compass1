/*
  Writes out a list of commonly used info to `build-info.json` so that scripts can read it
  it syncronously. The main use case for this would be a script or config file that needs
  this information but can't wait for an asyncronous step.
*/
import { promises as fsp } from 'fs';
import path from 'path';
import { getBuildInfo } from '@af/utils/build-info';

export const description = 'Writes out `build-info.json` file for use in CI';

export async function run() {
  const buildInfo = await getBuildInfo();
  const buildInfoPath = path.join(buildInfo.rootDir, 'build-info.json');

  await fsp.writeFile(buildInfoPath, JSON.stringify(buildInfo, null, 2));
}
