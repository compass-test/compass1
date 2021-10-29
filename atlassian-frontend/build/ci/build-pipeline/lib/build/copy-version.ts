/**
 * Copy package.json version information to a specific location in dist
 */
import * as bolt from 'bolt';
// @ts-expect-error no types for copy-pkg
import copyPkg from 'copy-pkg';
import fse from 'fs-extra';

export async function copyVersionJson(
  pkg: Pick<bolt.Package, 'config' | 'dir'>,
) {
  const { dir } = pkg;
  const distDir = `${dir}/dist`;
  await copyPkg(`${dir}/package.json`, `${dir}/dist`, {
    only: ['name', 'version', 'sideEffects'],
  });
  for (const distType of ['cjs', 'esm', 'es2019']) {
    await fse.mkdirp(`${distDir}/${distType}`);
    await fse.copy(
      `${distDir}/package.json`,
      `${distDir}/${distType}/version.json`,
    );
  }
  await fse.remove(`${distDir}/package.json`);
}
