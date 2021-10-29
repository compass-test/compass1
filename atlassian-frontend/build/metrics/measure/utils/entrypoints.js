const bolt = require('bolt');
const fs = require('fs');
const minimatch = require('minimatch');
const path = require('path');

const filesRegex = /\.(js|(?<!\.d\.)tsx?)$/;

async function getPackages(paths /*: string[] */) {
  const workspaces = await bolt.getWorkspaces();
  return workspaces
    .filter(ws =>
      paths.some(pathToPackage =>
        minimatch(ws.dir, `**/${pathToPackage}`, { matchBase: true }),
      ),
    )
    .map(ws => ws.dir);
}

async function getEntryPointsPerPackage(pathToPackage /*: string */) {
  let entryPath;
  let packageName = pathToPackage;
  if (pathToPackage.includes('src')) {
    [packageName, entryPath] = pathToPackage.split('/src/');
  }
  const pkgName = (await getPackages([packageName])).pop();
  // if you pass the package, it run for all the entrypoints
  if (entryPath) {
    return [`${pkgName}/src/${entryPath}`];
  }
  // We only consider files at the root of `src` as EntryPoints.
  if (pathToPackage.includes('src') && pathToPackage.match(filesRegex)) {
    // If we pass the entry point in this format `package/src/entrypoint.ts`.
    return [path.join(process.cwd(), `packages/${pathToPackage}`)];
  }

  return fs
    .readdirSync(`${pkgName}/src`)
    .filter(file => file.match(filesRegex))
    .map(file => path.join(`${pkgName}/src`, file));
}

async function getEntryPoints(pathsToPackage /*: string[] */) {
  let allEntryPoints = [];
  if (pathsToPackage.length > 1) {
    for (const pathToPackage of pathsToPackage) {
      allEntryPoints.push(await getEntryPointsPerPackage(pathToPackage));
    }
    allEntryPoints = allEntryPoints.reduce((acc, a) => [...acc, ...a], []);
  } else {
    allEntryPoints = await getEntryPointsPerPackage(pathsToPackage[0]);
  }
  return allEntryPoints;
}

module.exports = {
  filesRegex,
  getEntryPoints,
  getPackages,
};
