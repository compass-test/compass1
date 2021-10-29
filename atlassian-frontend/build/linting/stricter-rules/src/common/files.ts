import path from 'path';
import JSON5 from 'json5';
import micromatch from 'micromatch';

import { AFPackage, ExampleConfig } from '@atlaskit/build-utils/types';

import { getFromCache, EXAMPLE_CONFIG_PREFIX } from './cache';
import { EnrichedPackage, FileToData, FileToDependency } from '../types';

// We use .jsonc so the IDE doesn't complain about comments
export const EXAMPLE_CONFIG_PATH = path.join('examples', 'config.jsonc');

const testGlobs = [
  '**/__tests__/**',
  '**/test.{ts,js,tsx,jsx}',
  '**/*.test.{ts,js,tsx,jsx}',
];

const nonSrcGlobs = [
  ...testGlobs,
  '**/packages/*/*/!(src|build)/*',
  '**/packages/*/*/!(src|build)/*/**',
  '**/examples.{ts,js,tsx,jsx}',
];

export const partitionIntoPackages = (
  rootPath: string,
  workspaces: AFPackage[],
  files: FileToData,
  disableCache = false,
) => {
  // Initiate enriched packages
  const packages: EnrichedPackage[] = workspaces.map(pkg => ({
    ...pkg,
    packagePath: path.relative(rootPath, pkg.dir),
    srcFiles: [],
    nonSrcFiles: [],
    exampleFiles: [],
    testFiles: [],
    exampleConfig: {},
  }));

  const fileNameToPackage = (fileName: string) =>
    packages.find(pkg => fileName.startsWith(pkg.dir + path.sep));

  // Populate the list of enriched packages
  Object.entries(files).forEach(([fileName, file]) => {
    const pkg = fileNameToPackage(fileName);
    if (!pkg) {
      return;
    }
    const relativeFileName = path.relative(pkg.dir, fileName);

    if (relativeFileName.startsWith('node_modules')) {
      return;
    }

    if (!micromatch.isMatch(fileName, nonSrcGlobs)) {
      pkg.srcFiles.push(fileName);
      return;
    }

    pkg.nonSrcFiles.push(fileName);

    if (relativeFileName === EXAMPLE_CONFIG_PATH) {
      const exampleConfig = getFromCache<ExampleConfig>(
        EXAMPLE_CONFIG_PREFIX,
        fileName,
        () => JSON5.parse(file.source || '{}'),
        { disableCache },
      );
      pkg.exampleConfig = exampleConfig;
    } else if (relativeFileName.startsWith('examples' + path.sep)) {
      pkg.exampleFiles.push(fileName);
    } else if (micromatch.isMatch(fileName, testGlobs)) {
      pkg.testFiles.push(fileName);
    }
  });

  return packages;
};

export const filterImportsDep = (
  files: string[],
  dep: string,
  dependencies: FileToDependency,
  workspaceByName: Record<string, AFPackage>,
) =>
  files.filter(file => {
    const importedDeps = dependencies[file] || [];
    let foundDep = importedDeps.some(importedDep => importedDep.includes(dep));

    // To handle resolution of @atlaskit etc. to paths
    if (!foundDep && workspaceByName[dep]) {
      const pkgPath = workspaceByName[dep].dir;
      foundDep = importedDeps.some(importedDep =>
        importedDep.includes(pkgPath),
      );
    }

    return foundDep;
  });
