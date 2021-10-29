/*
  Writes out a list of changed packages and files to `changed-packages.json` so that scripts can read it
  it syncronously. The main use case for this would be a script or config file that needs
  this information but can't wait for an asyncronous step.
  To read this file syncronously, use
   import { getChangedPackagesSync } `@af/utils/changed-packages`;
*/
import { promises as fsp } from 'fs';
import path from 'path';
import { getChangedPackagesInfo } from '@af/utils/changed-packages';
import { getBuildInfo } from '@af/utils/build-info';

export const description =
  'Writes out `changed-packages-info.json` file for use in CI';

export async function run() {
  const { rootDir } = await getBuildInfo();
  const changedPackagesInfo = await getChangedPackagesInfo();

  const changedPackagesInfoPath = path.join(
    rootDir,
    'changed-packages-info.json',
  );

  await fsp.writeFile(
    changedPackagesInfoPath,
    JSON.stringify(changedPackagesInfo, null, 2),
  );
}
