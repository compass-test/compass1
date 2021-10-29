import { promises as fsp } from 'fs';
import path from 'path';
const PATCHED_YARNS_PATH =
  './packages/monorepo-tooling/branch-deploy-product-integrator/patched-yarn/';

const yarnRegex = /yarn-[0-9]+.[0-9]+.[0-9]+.js/gi;

/*
Yarn does not like prereleases being used in yarn.lock ranges. So the unpatched yarn
ends up re-adding entries for all the ranges that contain a prerelease.
This is undesirable for branch deploys.

To fix this, the integrator has patched versions of yarn in the patched-yarn directory.
These patched versions of yarn have a modified version of the semver library.
The modified version of semver has the includePrerelease config defaulted to true, and as a result
all the yarn functionality works as expected, but now with the inclusion of correct handling  of prereleases.

This function scans the product repo for yarn versions, and then checks if our repo has a patch for that version.
If it does not have a patched version it throws an error.

See patched-yarn/README.md for instructions on how to patch a newer version of yarn.
*/
export const patchYarn = async (productDir: string, afDir: string) => {
  const productYarnPath = path.join(productDir, './.yarn/releases');
  const patchedYarnsPath = path.join(afDir, PATCHED_YARNS_PATH);

  const [yarnDir, patchedYarns] = await Promise.all([
    fsp.readdir(productYarnPath),
    fsp.readdir(patchedYarnsPath),
  ]);

  return Promise.all(
    yarnDir
      .filter(yarnFile => yarnFile.match(yarnRegex))
      .map(async yarnFile => {
        const patchedYarn = patchedYarns.find(patchedYarn =>
          patchedYarn.includes(yarnFile),
        );
        if (!patchedYarn) {
          throw new Error(`No patched version available for ${yarnFile}`);
        }
        console.log(`Patching yarn ${yarnFile}`);
        await fsp.copyFile(
          path.join(patchedYarnsPath, patchedYarn),
          path.join(productYarnPath, yarnFile),
        );
      }),
  );
};
