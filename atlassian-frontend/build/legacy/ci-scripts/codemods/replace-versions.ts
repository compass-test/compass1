/**
 * Replaces all unversioned codemods prefixed with "next-" with their actual version before publishing.
 * This prevents assigning an out of date version to a package's codemod if the package is bumped before your codemod release.
 *
 * Codemods prefixed with 'optimistic-next-' will also be replaced to 'optimistic-<version>-'.
 *
 * Should run before `yarn changeset version` so that it can retrieve changeset information.
 * Stages the renames in git but does not commit the result. Relies on the changeset version command committing.
 */
import { promises as fsp } from 'fs';
import path from 'path';

import getReleasePlan from '@changesets/get-release-plan';
import { getPackages, Package } from '@manypkg/get-packages';
import globby from 'globby';
import simpleGit from 'simple-git/promise';

type Result = {
  oldPath: string;
  newPath: string;
  replacedFiles: string[];
};

async function updateUnversionedCodemods(pkg: Package, version: string) {
  const unversionedCodemods = await globby('codemods/?(optimistic-)next-*', {
    cwd: pkg.dir,
  });
  return Promise.all(
    unversionedCodemods.map(async codemod => {
      const versionedName = codemod.replace(
        /codemods\/(optimistic-)?next-/,
        `codemods/$1${version}-`,
      );
      const oldPath = path.join(pkg.dir, codemod);
      const newPath = path.join(pkg.dir, versionedName);
      await fsp.rename(oldPath, newPath);
      console.log(
        `${pkg.packageJson.name}: renamed '${codemod}' to '${versionedName}'`,
      );
      const replacedFiles = await updateCodemodReferences(
        pkg.dir,
        codemod,
        versionedName,
      );
      return { oldPath, newPath, replacedFiles };
    }),
  );
}

async function updateCodemodReferences(
  pkgDir: string,
  oldPath: string,
  newPath: string,
) {
  const codemodFiles = await globby(path.join(pkgDir, 'codemods', '**'), {
    nodir: true,
  });

  const oldName = path.basename(oldPath, path.extname(oldPath));
  const newName = path.basename(newPath, path.extname(newPath));

  const searchRegex = new RegExp(oldName, 'g');

  const replacedFiles = await Promise.all(
    codemodFiles.map(async file => {
      const fileContents = await fsp.readFile(file, 'utf8');
      const replacedContents = fileContents.replace(searchRegex, newName);

      if (fileContents !== replacedContents) {
        await fsp.writeFile(file, replacedContents);
        return file;
      }
      return null;
    }),
  );

  return replacedFiles.filter(Boolean) as string[];
}

async function main() {
  const cwd = process.cwd();
  const { root, packages } = await getPackages(cwd);
  const releasePlan = await getReleasePlan(root.dir);
  const packagesMap = new Map(packages.map(pkg => [pkg.packageJson.name, pkg]));
  const errors = [];

  const results = await Promise.all<Result[] | undefined>(
    releasePlan.releases.map(async release => {
      if (release.type === 'none') {
        return;
      }
      const pkg = packagesMap.get(release.name);
      if (!pkg) {
        errors.push(`Cannot find package "${release.name}"`);
        return;
      }
      return updateUnversionedCodemods(pkg, release.newVersion);
    }),
  );

  const actualResults = results.filter(
    (res): res is Result[] => Array.isArray(res) && res.length > 0,
  );
  if (actualResults.length === 0) {
    console.log(
      `No unversioned codemods found for packages: ${releasePlan.releases.map(
        release => release.name,
      )}`,
    );
    return;
  }

  const git = simpleGit();
  for (const pkgResult of actualResults) {
    for (const result of pkgResult) {
      // -r flag is required for removing directories
      await git.rm(['-r', result.oldPath]);
      await git.add([result.newPath, ...result.replacedFiles]);
    }
  }
}

if (require.main === module) {
  main().catch(e => {
    console.error(e);
    process.exit(1);
  });
}
