import { promises as fsp } from 'fs';
import path from 'path';

import { getPackagesInfo, PackageInfo } from '@atlaskit/build-utils/tools';

import { DistType } from '../types';

type Options = {
  cwd?: string;
  packageName?: string;
  distType?: DistType[];
  pkg?: PackageInfo;
};

/**
 * Validates that the default entry points exist in the resulting dist bundle.
 * This catches an issue where TypeScript malforms the dist directory by reaching out of the
 * package being built and trying to compile multiple packages. This typically happens
 * when there is a circular dependency between packages.
 */
export async function validateDists(opts: Options) {
  const { cwd = process.cwd(), packageName, pkg, distType } = opts;

  const packagesInfo: PackageInfo[] = pkg
    ? [pkg]
    : await getPackagesInfo(cwd, undefined, true);

  const packagesToValidate = packagesInfo.filter(
    pkg => pkg.runBuild && (!packageName || packageName === pkg.name),
  );

  const errors = await Promise.all(
    packagesToValidate.map(async pkg => {
      const pkgErrors = await validatePackage(pkg, { distType });
      return pkgErrors.map(error => `${pkg.name} - ${error}`);
    }),
  );

  // @ts-ignore .flat exists in our version of node but not in our TS libs
  const packageDistErrors = errors.flat();

  return {
    success: packageDistErrors.length === 0,
    packageDistErrors,
  };
}

async function validatePackage(
  pkg: PackageInfo,
  { distType }: { distType: DistType[] | undefined },
) {
  if (distType && distType[0] === 'none') {
    return [];
  }

  const entryFieldMap = {
    cjs: 'main',
    esm: 'module',
    es2019: 'module:es2019',
    types: 'types',
  } as const;

  const entryFields = Object.entries(entryFieldMap)
    .filter(([type]) => !distType || distType.includes(type as any))
    .map(([, entryField]) => entryField);

  const results = await Promise.all(
    entryFields.map(async entryField => {
      const entryPath = pkg.config[entryField];
      if (entryPath) {
        try {
          await fsp.access(path.resolve(pkg.dir, entryPath));
        } catch (e) {
          return `"${entryField}" entry path "${entryPath}" does not exist`;
        }
      }
    }),
  );

  return results.filter(Boolean);
}
